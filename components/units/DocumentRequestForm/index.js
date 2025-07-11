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
      statusText: 'Your last request is pending review',
      message: isCharterer
        ? 'You can update your request or wait for the response'
        : 'Please review and respond to the request',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <UilClock size="24" className="fill-yellow-600" />,
    },
    UploadInProgress: {
      statusText: 'Your last request has documents being uploaded',
      message: isCharterer ? 'You can monitor the upload progress' : 'Documents are being uploaded by the charterer',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <UilSyncExclamation size="24" className="fill-blue-600" />,
    },
    DocumentsUploaded: {
      statusText: 'Your last request has been fulfilled with document uploads',
      message: isCharterer
        ? 'You can review the uploaded documents or ask for revisions'
        : 'Documents have been uploaded for your review',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: <UilCheckCircle size="24" className="fill-indigo-600" />,
    },
    RevisionRequested: {
      statusText: 'Your last request has revision requirements',
      message: isCharterer
        ? 'You can update your request based on the feedback'
        : 'Please provide the requested revisions',
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
  const contentRef = useRef(null);

  const schema = yup.object().shape({
    selectedDocuments: yup.array().of(yup.string()),
    comments: yup.string().max(500, 'Comments cannot exceed 500 characters'),
  });

  const methods = useHookFormParams({
    schema,
    state: {
      selectedDocuments: initialDocuments,
      comments,
    },
  });

  const handleToggle = () => setToggle((prev) => !prev);

  const printTextCta = useMemo(() => {
    return toggle ? 'Hide' : 'Show';
  }, [toggle]);

  const handleSubmit = async (formData, action) => {
    const transformedData = documentRequestsRequestAdapter(formData);
    await onSubmit(transformedData, action);
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
      if (status === 'initial' || status === 'Expired' || status === 'Rejected') {
        buttons.push({
          text: 'Request from Vessel Owner',
          variant: 'primary',
          type: 'submit',
          disabled: false,
        });
      } else if (status === 'Pending' || status === 'UploadInProgress') {
        buttons.push({
          text: 'Update Document Request',
          variant: 'secondary',
          type: 'submit',
          disabled: true,
        });
      } else if (status === 'DocumentsUploaded') {
        buttons.push({
          text: 'Ask for Revision',
          variant: 'outline',
          type: 'submit',
          disabled: false,
        });
        buttons.push({
          text: 'Confirm Completeness',
          variant: 'primary',
          type: 'submit',
          disabled: false,
        });
      }
    }

    if (isOwner) {
      if (['Pending', 'UploadInProgress', 'RevisionRequested'].includes(status)) {
        buttons.push({
          text: 'Submit to Charterer',
          variant: 'primary',
          type: 'submit',
          disabled: false,
        });
      }
    }

    return buttons;
  };

  const buttonConfig = getButtonConfig();
  const statusConfig = getStatusConfig(status, role);

  // Determine if comments section should be shown
  const shouldShowComments = () => {
    const hideCommentsStatuses = ['initial', 'Expired', 'Rejected', 'RevisionRequested'];
    return !hideCommentsStatuses.includes(status);
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
                      disabled={disabled}
                      labelStyles="cursor-pointer text-sm leading-relaxed text-gray-700"
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
                  placeholder="Add any additional comments or requirements..."
                  rows={6}
                  disabled={disabled}
                  maxLength={500}
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
                    case 'Update Document Request':
                      return 'update';
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
