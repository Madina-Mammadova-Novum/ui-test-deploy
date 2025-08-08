'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { UilCheckCircle, UilClock, UilInfoCircle, UilSyncExclamation, UilTimes } from '@iconscout/react-unicons';
import * as yup from 'yup';

import { DocumentRequestFormPropTypes } from '@/lib/types';

import { documentRequestsRequestAdapter } from '@/adapters';
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
import AngleDownSVG from '@/assets/images/angleDown.svg';
import { FormManager } from '@/common';
import { Button, CheckBoxInput, TextArea } from '@/elements';
import { ROLES } from '@/lib/constants';
import {
  approveExtensionRequest,
  getAssignedTasks,
  getTaskExtensionTimeOptions,
  rejectExtensionRequest,
} from '@/services/assignedTasks';
import { getClearanceFiles } from '@/services/clearanceFiles';
import { getAuthSelector } from '@/store/selectors';
import { ConfirmModal, DynamicCountdownTimer, ExtendCountdown, ModalWindow } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

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
  documentRequestId = null, // Add prop for document request ID
  offerId = null, // Add prop for offer ID
  requestedFiles = [],
}) => {
  const [toggle, setToggle] = useState(true);
  const [clearanceFiles, setClearanceFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [calculatedHeight, setCalculatedHeight] = useState('auto');
  const contentRef = useRef(null);

  // Countdown related state
  const { session } = useSelector(getAuthSelector);

  const [countdownData, setCountdownData] = useState({
    expiresAt: null,
    countdownStatus: 'Expired',
    allowExtension: false,
    extensionTimeOptions: [],
    taskId: null,
    assignTo: null,
    initiator: null,
    extensionRequests: [],
    pendingExtensionRequest: null, // Object to store targetId and requestedMinutes
  });
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Check if current user has permission to extend countdown
  const hasExtensionPermission = () => {
    if (!countdownData.assignTo || !session) return false;

    const { assignTo } = countdownData;
    const currentUserId = session.userId;
    const currentCompanyId = session.user?.companyId; // Assuming companyId is in user object

    // Check if current user matches assignTo userId
    if (assignTo.userId && assignTo.userId === currentUserId) {
      return true;
    }

    // Check if current user's company matches assignTo companyId
    if (assignTo.companyId && assignTo.companyId === currentCompanyId) {
      return true;
    }

    return false;
  };

  // Check if current user is the initiator and can approve/reject extension requests
  const hasApprovalPermission = () => {
    if (!countdownData.initiator || !session || !countdownData.pendingExtensionRequest) return false;

    const { initiator } = countdownData;
    const currentUserId = session.userId;
    const currentCompanyId = session.user?.companyId; // Assuming companyId is in user object

    // Check if current user matches initiator userId
    if (initiator.userId && initiator.userId === currentUserId) {
      return true;
    }

    // Check if current user's company matches initiator companyId
    if (initiator.companyId && initiator.companyId === currentCompanyId) {
      return true;
    }

    return false;
  };

  // Fetch countdown data when we have document requests
  const fetchCountdownData = async (requestId) => {
    try {
      const assignedTasksResponse = await getAssignedTasks({
        targetId: requestId,
        purpose: 'ClearanceFilesRequest',
      });

      // First try to find the task with status "Created", otherwise take the first one
      const tasks = assignedTasksResponse?.data || [];
      const createdTask = tasks.find((task) => task.status === 'Created') || tasks[0];

      if (!createdTask) {
        setCountdownData({
          expiresAt: null,
          countdownStatus: 'Expired',
          allowExtension: false,
          extensionTimeOptions: [],
          taskId: null,
          assignTo: null,
          initiator: null,
          extensionRequests: [],
          pendingExtensionRequest: null,
        });
        setAllowCountdownExtension(false);
        return;
      }

      const expiresAt = createdTask?.countdownTimer?.expiresAt;
      const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';
      const taskId = createdTask?.id;
      const { assignTo, initiator, extensionRequests } = createdTask || {};

      // Fetch extension time options if we have a task ID
      let allowExtension = false;
      let extensionTimeOptions = [];

      if (taskId) {
        try {
          const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
          allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
          extensionTimeOptions = extensionTimeOptionsAdapter({
            options: extensionTimeOptionsResponse?.data?.options || [],
          });
        } catch (extensionError) {
          console.error(`Error fetching extension time options for document request ${requestId}:`, extensionError);
        }
      }

      const newCountdownData = {
        expiresAt,
        countdownStatus,
        allowExtension,
        extensionTimeOptions,
        taskId,
        assignTo,
        initiator,
        extensionRequests,
        pendingExtensionRequest: null,
      };

      // Find and set pending extension request
      const pendingRequest = extensionRequests.find((request) => request.status === 'Pending');
      if (pendingRequest) {
        newCountdownData.pendingExtensionRequest = {
          targetId: pendingRequest.id,
          requestedMinutes: pendingRequest.requestedMinutes,
        };
      }

      setCountdownData(newCountdownData);
      setAllowCountdownExtension(allowExtension && hasExtensionPermission());
    } catch (error) {
      console.error(`Error fetching countdown data for document request ${requestId}:`, error);
      setCountdownData({
        expiresAt: null,
        countdownStatus: 'Expired',
        allowExtension: false,
        extensionTimeOptions: [],
        taskId: null,
        assignTo: null,
        initiator: null,
        extensionRequests: [],
        pendingExtensionRequest: null,
      });
      setAllowCountdownExtension(false);
    }
  };

  // Update permission when countdown data or session changes
  useEffect(() => {
    setAllowCountdownExtension(countdownData.allowExtension && hasExtensionPermission());
  }, [countdownData, session]);

  // Handle approve extension request
  const handleApproveExtension = async (requestId) => {
    setActionLoading(true);
    try {
      const response = await approveExtensionRequest({ requestId });

      // Check if there's an error in the response
      if (response?.error || response?.message) {
        console.error('Error approving extension request:', response?.message || response?.error);
        errorToast('Failed to approve extension request');
        return; // Don't proceed with success actions
      }

      successToast('Extension request approved successfully');
      // Refresh countdown data after approval
      if (documentRequestId) {
        fetchCountdownData(documentRequestId);
      }
    } catch (error) {
      console.error('Error approving extension request:', error);
      errorToast('Failed to approve extension request');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle reject extension request
  const handleRejectExtension = async (requestId) => {
    setActionLoading(true);
    try {
      const response = await rejectExtensionRequest({ requestId });

      // Check if there's an error in the response
      if (response?.error || response?.message) {
        console.error('Error rejecting extension request:', response?.message || response?.error);
        errorToast('Failed to reject extension request');
        return; // Don't proceed with success actions
      }

      successToast('Extension request rejected successfully');
      // Refresh countdown data after rejection
      if (documentRequestId) {
        fetchCountdownData(documentRequestId);
      }
    } catch (error) {
      console.error('Error rejecting extension request:', error);
      errorToast('Failed to reject extension request');
    } finally {
      setActionLoading(false);
    }
  };

  // Show approve confirmation modal
  const showApproveModal = () => {
    setIsApproveModalOpen(true);
  };

  // Show reject confirmation modal
  const showRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  // Handle confirm approve
  const handleConfirmApprove = () => {
    handleApproveExtension(countdownData.pendingExtensionRequest?.targetId);
    setIsApproveModalOpen(false);
  };

  // Handle confirm reject
  const handleConfirmReject = () => {
    handleRejectExtension(countdownData.pendingExtensionRequest?.targetId);
    setIsRejectModalOpen(false);
  };

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

  // Initialize clearance files
  useEffect(() => {
    // If user is owner, use requestedFiles directly and skip fetching
    if (role === ROLES.OWNER) {
      setLoading(true);
      try {
        const options = (requestedFiles || []).map((file) => ({
          label: file.name,
          value: file.name,
        }));
        setClearanceFiles(options);
      } catch (error) {
        console.error('Failed to set requested files for owner:', error);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Otherwise fetch the available clearance files
    const fetchClearanceFiles = async () => {
      setLoading(true);
      try {
        const response = await getClearanceFiles();
        if (response.data) {
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
  }, [role, requestedFiles]);

  // Fetch countdown data when documentRequestId changes
  useEffect(() => {
    if (documentRequestId) {
      fetchCountdownData(documentRequestId);
    }
  }, [documentRequestId]);

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

  // Recalculate height when content changes
  const recalculateHeight = () => {
    if (contentRef.current) {
      if (toggle) {
        // Use setTimeout to ensure DOM updates are complete
        setTimeout(() => {
          if (contentRef.current) {
            setCalculatedHeight(`${contentRef.current.scrollHeight}px`);
          }
        }, 200);
      } else {
        setCalculatedHeight('50px');
      }
    }
  };

  // Effect to recalculate height when dynamic content changes
  useEffect(() => {
    recalculateHeight();
  }, [
    toggle,
    clearanceFiles,
    loading,
    actionLoading,
    countdownData,
    status,
    allowCountdownExtension,
    methods.formState.errors,
  ]);

  return (
    <div
      className="border-grey-darker relative box-border overflow-hidden rounded-lg border border-solid px-5 py-3 transition-all duration-500"
      ref={contentRef}
      style={{ height: calculatedHeight }}
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

      {/* Countdown Timer Section - Show when countdown data exists */}
      {countdownData.taskId &&
        (status === 'Pending' ||
          status === 'In Progress' ||
          status === 'Revision Requested' ||
          status === 'Documents Uploaded') && (
          <div className="mt-4 flex flex-col items-start justify-center gap-y-3">
            {/* Countdown Timer */}
            <div className="border-l-2 border-l-blue px-4 py-1">
              <span className="text-sm font-semibold uppercase">Document Request Countdown</span>
              <div className="flex text-xsm">
                <DynamicCountdownTimer
                  date={countdownData.expiresAt}
                  status={countdownData.countdownStatus}
                  autoStart={countdownData.countdownStatus === 'Running'}
                />
              </div>
            </div>

            {/* Extend Countdown Button - Show only if user has permission */}
            {countdownData.allowExtension && hasExtensionPermission() && (
              <ModalWindow
                buttonProps={{
                  text: 'Request document time extension',
                  variant: 'primary',
                  size: 'small',
                  disabled: !allowCountdownExtension,
                  className:
                    'border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold',
                }}
              >
                <ExtendCountdown
                  offerId={offerId}
                  taskId={countdownData.taskId}
                  onExtensionSuccess={() => {
                    setAllowCountdownExtension(false);
                    // Refresh countdown data after extension
                    if (documentRequestId) {
                      fetchCountdownData(documentRequestId);
                    }
                  }}
                  options={countdownData.extensionTimeOptions}
                />
              </ModalWindow>
            )}

            {/* Approve/Reject Extension Buttons - Show only if user is the initiator */}
            {countdownData.extensionRequests.length > 0 && countdownData.taskId && hasApprovalPermission() && (
              <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 p-3">
                <p className="text-xsm">
                  You have a pending extension request for{' '}
                  <span className="font-semibold">
                    {countdownData.pendingExtensionRequest?.requestedMinutes} minutes
                  </span>
                </p>

                <div className="flex gap-2">
                  <Button
                    buttonProps={{
                      text: 'Approve Extension',
                      variant: 'primary',
                      size: 'medium',
                      className:
                        'border border-green-500 hover:border-green-600 bg-green-500 hover:bg-green-600 text-white whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold',
                    }}
                    disabled={actionLoading}
                    onClick={showApproveModal}
                  />
                  <Button
                    buttonProps={{
                      text: 'Reject Extension',
                      variant: 'delete',
                      size: 'medium',
                      className:
                        'border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold',
                    }}
                    disabled={actionLoading}
                    onClick={showRejectModal}
                  />
                </div>
              </div>
            )}
          </div>
        )}

      {/* Status Description Section */}
      <div className={`mt-5 rounded-lg border p-3 ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
        <div className="flex items-center gap-2">
          {statusConfig.icon}
          <span className={`text-xsm font-medium ${statusConfig.color}`}>{statusConfig.statusText}</span>
        </div>
        <p className={`mt-2 text-xsm ${statusConfig.color}`}>{statusConfig.message}</p>
      </div>

      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => handleSubmit(formData, 'default')}
          className={`${toggle ? 'opacity-100' : 'py-0 opacity-0'} pt-5 transition-all duration-500`}
          hideSubmitButton
        >
          <div className={`grid grid-cols-1 gap-6 ${shouldShowComments() ? 'lg:grid-cols-2' : ''}`}>
            {/* Left side - Checkbox list */}
            <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200 p-4">
              <h6 className="mb-3 text-xsm font-medium text-gray-700">Document Requirements</h6>
              {loading ? (
                <div className="text-sm text-gray-500">Loading documents...</div>
              ) : (
                <div className="space-y-2">
                  {clearanceFiles.map((option, index) => (
                    <CheckBoxInput
                      key={option.value}
                      name={`selectedDocuments.${index}`}
                      checked={methods.watch('selectedDocuments')?.includes(option.value)}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      disabled={shouldDisableCheckboxes()}
                      labelStyles={`text-xsm text-gray-700 ${shouldDisableCheckboxes() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
                <h6 className="mb-3 text-xsm font-medium text-gray-700">Comments</h6>
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

      {/* Approve Extension Confirmation Modal */}
      <ConfirmModal
        isOpen={isApproveModalOpen}
        onConfirm={handleConfirmApprove}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Extension Request"
        message="Are you sure you want to approve this extension request? This will extend the document submission deadline."
        confirmText={actionLoading ? 'Approving...' : 'Yes, Approve'}
        cancelText="Cancel"
        variant="primary"
        okButtonProps={{
          disabled: actionLoading,
        }}
        cancelButtonProps={{
          disabled: actionLoading,
        }}
      />

      {/* Reject Extension Confirmation Modal */}
      <ConfirmModal
        isOpen={isRejectModalOpen}
        onConfirm={handleConfirmReject}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Extension Request"
        message="Are you sure you want to reject this extension request? The original deadline will remain in effect."
        confirmText={actionLoading ? 'Rejecting...' : 'Yes, Reject'}
        cancelText="Cancel"
        variant="delete"
        okButtonProps={{
          disabled: actionLoading,
        }}
        cancelButtonProps={{
          disabled: actionLoading,
        }}
      />
    </div>
  );
};

DocumentRequestForm.propTypes = DocumentRequestFormPropTypes;

export default DocumentRequestForm;
