'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { UilCheckCircle, UilClock, UilInfoCircle, UilSyncExclamation, UilTimes } from '@iconscout/react-unicons';
import * as yup from 'yup';

import { DocumentRequestFormPropTypes } from '@/lib/types';

import { documentRequestsRequestAdapter } from '@/adapters';
import AngleDownSVG from '@/assets/images/angleDown.svg';
import { FormManager } from '@/common';
import { Button, CheckBoxInput, TextArea } from '@/elements';
import { ROLES } from '@/lib/constants';
import { getClearanceFiles } from '@/services/clearanceFiles';
import { useHookFormParams } from '@/utils/hooks';

// Status descriptions and configurations
const getStatusConfig = (status, role) => {
  const isCharterer = role === ROLES.CHARTERER;
  const isOwner = role === ROLES.OWNER;

  const statusConfigs = {
    initial: {
      statusText: "You haven't created any document request yet",
      message: 'You can create your first document request to proceed with clearance',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <UilInfoCircle size="24" className="fill-blue-600" />,
    },
    Pending: {
      statusText: isOwner ? 'Document request received from charterer' : 'Your last request is pending review',
      message: isCharterer
        ? 'Pending owner document submission - awaiting required files and documentation'
        : 'Please review the requirements and prepare the requested documents',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <UilClock size="24" className="fill-yellow-600" />,
    },
    'In Progress': {
      statusText: isOwner ? 'You are currently uploading documents' : 'Your last request has documents being uploaded',
      message: isCharterer ? 'You can monitor the upload progress' : 'Submit the required documents to the charterer',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <UilSyncExclamation size="24" className="fill-blue-600" />,
    },
    'Documents Uploaded': {
      statusText: isOwner
        ? 'Documents have been uploaded successfully'
        : 'Your last request has been fulfilled with document uploads',
      message: isCharterer
        ? 'You can review the uploaded documents or ask for revisions'
        : 'Waiting for charterer review of the uploaded documents',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: <UilCheckCircle size="24" className="fill-indigo-600" />,
    },
    'Revision Requested': {
      statusText: isOwner
        ? 'Charterer has requested document revisions'
        : 'Your last request has revision requirements',
      message: isCharterer
        ? 'You can update your request based on the feedback'
        : 'Please review the feedback and provide the requested document revisions',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: <UilInfoCircle size="24" className="fill-orange-600" />,
    },
    Approved: {
      statusText: 'Your last request has been approved',
      message: 'You can create a new document request if needed',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <UilCheckCircle size="24" className="fill-green-600" />,
    },
    Rejected: {
      statusText: 'Your last request has been rejected',
      message: 'You can create a new document request with updated requirements',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <UilTimes size="24" className="fill-red-600" />,
    },
    Expired: {
      statusText: 'Your last request has expired',
      message: 'You can create a new document request to continue',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: <UilClock size="24" className="fill-gray-600" />,
    },
  };

  return statusConfigs[status] || statusConfigs.initial;
};

const DocumentRequestForm = ({
  role,
  onSubmit,
  title = 'Please choose the documents required for clearance of the vessel.',
  initialDocuments = [],
  comments = '',
  status = '',
  disabled = false,
}) => {
  const [toggle, setToggle] = useState(true);
  const [clearanceFiles, setClearanceFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const contentRef = useRef(null);

  // Dynamic schema based on whether comments are required (revision mode)
  const isRevisionMode = role === ROLES.CHARTERER && status === 'Documents Uploaded';
  const schema = yup.object().shape({
    selectedDocuments: yup.array().of(yup.string()),
    comments: isRevisionMode
      ? yup
          .string()
          .required('Comments are required for revision requests')
          .max(500, 'Comments cannot exceed 500 characters')
      : yup.string().max(500, 'Comments cannot exceed 500 characters'),
  });

  const methods = useHookFormParams({
    schema,
    state: {
      selectedDocuments: initialDocuments,
      comments,
    },
    mode: 'onChange', // Enable real-time validation
  });

  const handleToggle = () => setToggle((prev) => !prev);

  const printTextCta = useMemo(() => {
    return toggle ? 'Hide' : 'Show';
  }, [toggle]);

  const handleSubmit = async (formData, action) => {
    setActionLoading(true);
    try {
      const transformedData = documentRequestsRequestAdapter(formData);
      await onSubmit(transformedData, action);
    } finally {
      setActionLoading(false);
    }
  };

  // Fetch clearance files on mount
  useEffect(() => {
    const fetchClearanceFiles = async () => {
      setLoading(true);
      try {
        const response = await getClearanceFiles();
        if (response.data) {
          // Transform the response data using name for both label and value
          const options = response.data.map((file) => ({
            label: file.name,
            value: file.name,
          }));
          setClearanceFiles(options);
        }
      } catch (error) {
        console.error('Failed to fetch clearance files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClearanceFiles();
  }, []);

  // Handle individual checkbox change
  const handleCheckboxChange = (optionValue, checked) => {
    // Don't allow changes if checkboxes should be disabled
    if (shouldDisableCheckboxes()) {
      return;
    }

    const currentValues = methods.watch('selectedDocuments') || [];
    let newValues;

    if (checked) {
      // Add the value if checked and not already present
      newValues = currentValues.includes(optionValue) ? currentValues : [...currentValues, optionValue];
    } else {
      // Remove the value if unchecked
      newValues = currentValues.filter((v) => v !== optionValue);
    }

    methods.setValue('selectedDocuments', newValues);
  };

  // Role-based button configuration
  const getButtonConfig = () => {
    const isCharterer = role === ROLES.CHARTERER;
    const isOwner = role === ROLES.OWNER;

    const buttons = [];

    if (isCharterer) {
      if (status === 'initial' || status === 'Expired' || status === 'Rejected' || status === 'Approved') {
        buttons.push({
          text: actionLoading ? 'Requesting...' : 'Request from Vessel Owner',
          variant: 'primary',
          type: 'submit',
          disabled: actionLoading,
        });
      } else if (status === 'Documents Uploaded') {
        buttons.push({
          text: actionLoading ? 'Requesting...' : 'Ask for Revision',
          variant: 'secondary',
          type: 'submit',
          disabled: actionLoading,
        });
        buttons.push({
          text: actionLoading ? 'Confirming...' : 'Confirm Completeness',
          variant: 'primary',
          type: 'submit',
          disabled: actionLoading,
        });
      }
    }

    if (isOwner) {
      if (['Pending', 'In Progress', 'Revision Requested'].includes(status)) {
        buttons.push({
          text: actionLoading ? 'Submitting...' : 'Submit to Charterer',
          variant: 'primary',
          type: 'submit',
          disabled: actionLoading,
        });
      }
    }

    return buttons;
  };

  const buttonConfig = getButtonConfig();
  const statusConfig = getStatusConfig(status, role);

  // Determine if form fields should be read-only for owners
  const isOwnerReadOnly = useMemo(() => {
    const isOwner = role === ROLES.OWNER;
    const readOnlyStatuses = ['Pending', 'In Progress', 'Documents Uploaded', 'Revision Requested'];
    return isOwner && readOnlyStatuses.includes(status);
  }, [role, status]);

  // Determine if comments section should be shown - only when Ask for Revision button appears or for owners with revision requests
  const shouldShowComments = () => {
    const isCharterer = role === ROLES.CHARTERER;
    const isOwner = role === ROLES.OWNER;

    // Show comments for charterers when Ask for Revision button is available
    if (isCharterer) {
      return status === 'Documents Uploaded';
    }

    // Show comments for owners when revision is requested (read-only)
    if (isOwner) {
      return status === 'Revision Requested';
    }

    // Don't show comments for other cases
    return false;
  };

  // Determine if checkboxes should be disabled - disable for owners read-only mode, revision cases, pending and in-progress statuses
  const shouldDisableCheckboxes = () => {
    const disabledStatuses = ['Pending', 'In Progress'];
    return disabled || isOwnerReadOnly || shouldShowComments() || disabledStatuses.includes(status);
  };

  return (
    <div
      className="border-grey-darker relative box-border overflow-hidden rounded-lg border border-solid px-5 py-3 pb-3 pt-5 transition-all duration-500"
      ref={contentRef}
      style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '64px' }}
    >
      <div className="flex justify-between">
        <h5 className="text-sm font-semibold text-black">{title}</h5>
        <button
          type="button"
          className={`flex items-center gap-1 text-black ${toggle && 'text-blue'} text-xsm font-medium`}
          onClick={handleToggle}
          disabled={disabled}
        >
          {printTextCta} <AngleDownSVG className={`fill-black ${toggle && 'rotate-180 fill-blue'}`} />
        </button>
      </div>

      {/* Status Description Section */}
      <div className={`mt-5 rounded-lg border p-3 ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
        <div className="flex items-center gap-2">
          {statusConfig.icon}
          <span className={`text-sm font-medium ${statusConfig.color}`}>{statusConfig.statusText}</span>
        </div>
        <p className={`mt-2 text-sm ${statusConfig.color}`}>{statusConfig.message}</p>
      </div>

      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => handleSubmit(formData, 'default')}
          className={`${toggle ? 'opacity-100' : 'py-0 opacity-0'} pt-5 transition-all duration-500`}
          hideSubmitButton
        >
          <div className={`grid grid-cols-1 gap-6 ${shouldShowComments() ? 'lg:grid-cols-2' : ''}`}>
            {/* Left side - Checkbox list */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h6 className="mb-3 text-sm font-medium text-gray-700">Document Requirements</h6>
              {loading ? (
                <div className="text-sm text-gray-500">Loading documents...</div>
              ) : (
                <div className="space-y-3">
                  {clearanceFiles.map((option, index) => (
                    <CheckBoxInput
                      key={option.value}
                      name={`selectedDocuments.${index}`}
                      checked={methods.watch('selectedDocuments')?.includes(option.value)}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      disabled={shouldDisableCheckboxes()}
                      labelStyles={`text-sm leading-relaxed text-gray-700 ${shouldDisableCheckboxes() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option.label}
                    </CheckBoxInput>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Comments (conditionally rendered) */}
            {shouldShowComments() && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h6 className="mb-3 text-sm font-medium text-gray-700">Comments</h6>
                <TextArea
                  name="comments"
                  placeholder={
                    isOwnerReadOnly ? 'No comments shared yet' : 'Add any additional comments or requirements...'
                  }
                  rows={6}
                  disabled={disabled || isOwnerReadOnly}
                  maxLength={500}
                  {...methods.register('comments')}
                  error={methods.formState.errors.comments?.message}
                />
              </div>
            )}
          </div>

          {/* Buttons section */}
          {buttonConfig.length > 0 && !disabled && (
            <div className="mt-6 flex justify-end gap-3">
              {buttonConfig.map((button) => {
                const getActionType = (buttonText) => {
                  switch (buttonText) {
                    case 'Request from Vessel Owner':
                      return 'create';
                    case 'Ask for Revision':
                      return 'revision';
                    case 'Confirm Completeness':
                      return 'confirm';
                    case 'Submit to Charterer':
                      return 'submit';
                    default:
                      return 'default';
                  }
                };

                const action = getActionType(button.text);

                return (
                  <Button
                    key={button.text}
                    buttonProps={{
                      text: button.text,
                      variant: button.variant,
                      size: 'large',
                    }}
                    disabled={button.disabled}
                    type={button.type}
                    onClick={
                      button.type === 'submit'
                        ? methods.handleSubmit((formData) => handleSubmit(formData, action))
                        : undefined
                    }
                  />
                );
              })}
            </div>
          )}
        </FormManager>
      </FormProvider>
    </div>
  );
};

DocumentRequestForm.propTypes = DocumentRequestFormPropTypes;

export default DocumentRequestForm;
