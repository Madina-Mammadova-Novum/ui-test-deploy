'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { UilCheckCircle, UilClock, UilInfoCircle, UilSyncExclamation, UilTimes } from '@iconscout/react-unicons';

import { PreFixtureDocumentRequestFormPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import { Button } from '@/elements';
import { ROLES } from '@/lib/constants';
import { getAssignedTasks } from '@/services/assignedTasks';
import { DynamicCountdownTimer } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';

// Status descriptions and configurations for pre-fixture (owner-only)
const getStatusConfig = (status) => {
  const statusConfigs = {
    initial: {
      statusText: 'No document request created yet',
      message: 'Waiting for document request from broker',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <UilInfoCircle size="24" className="fill-blue-600" />,
    },
    Pending: {
      statusText: 'Document request received from broker',
      message: 'Please review the requirements and prepare the requested documents',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: <UilClock size="24" className="fill-yellow-600" />,
    },
    'In Progress': {
      statusText: 'You are currently uploading documents',
      message: 'Submit the required documents to the broker',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <UilSyncExclamation size="24" className="fill-blue-600" />,
    },
    'Documents Uploaded': {
      statusText: 'Documents have been uploaded successfully',
      message: 'Waiting for broker review of the uploaded documents',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      icon: <UilCheckCircle size="24" className="fill-indigo-600" />,
    },
    'Revision Requested': {
      statusText: 'Broker has requested document revisions',
      message: 'Please review the feedback and provide the requested document revisions',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: <UilInfoCircle size="24" className="fill-orange-600" />,
    },
    Approved: {
      statusText: 'Documents have been approved',
      message: 'All required documents have been accepted by the broker',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <UilCheckCircle size="24" className="fill-green-600" />,
    },
    Rejected: {
      statusText: 'Document request has been rejected',
      message: 'Please wait for a new document request',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <UilTimes size="24" className="fill-red-600" />,
    },
    Expired: {
      statusText: 'Document request has expired',
      message: 'The deadline for document submission has passed',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: <UilClock size="24" className="fill-gray-600" />,
    },
  };

  return statusConfigs[status] || statusConfigs.initial;
};

const PreFixtureDocumentRequestForm = ({
  role,
  onSubmit,
  title = 'Document Request Information',
  requestedFiles = [],
  comments = '',
  status = 'initial',
  disabled = false,
  documentRequestId = null,
}) => {
  const [toggle, setToggle] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [calculatedHeight, setCalculatedHeight] = useState('auto');
  const contentRef = useRef(null);

  // Countdown related state
  const [countdownData, setCountdownData] = useState({
    expiresAt: null,
    countdownStatus: 'Expired',
    taskId: null,
  });

  // Fetch countdown data when we have document requests
  const fetchCountdownData = async (requestId) => {
    try {
      const assignedTasksResponse = await getAssignedTasks({
        targetId: requestId,
        purpose: 'Q88FileRequest',
      });

      // Prefer the task with status "Created" assigned to current user; otherwise fallback
      const tasks = assignedTasksResponse?.data || [];
      const currentUserId = getCookieFromBrowser('session-user-id');
      const createdTask =
        tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
        tasks.find((task) => task.status === 'Created') ||
        tasks[0];

      if (!createdTask) {
        setCountdownData({
          expiresAt: null,
          countdownStatus: 'Expired',
          taskId: null,
        });
        return;
      }

      const expiresAt = createdTask?.countdownTimer?.expiresAt;
      const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';
      const taskId = createdTask?.id;

      setCountdownData({
        expiresAt,
        countdownStatus,
        taskId,
      });
    } catch (error) {
      console.error(`Error fetching countdown data for document request ${requestId}:`, error);
      setCountdownData({
        expiresAt: null,
        countdownStatus: 'Expired',
        taskId: null,
      });
    }
  };

  // Fetch countdown data when documentRequestId changes
  useEffect(() => {
    if (documentRequestId) {
      fetchCountdownData(documentRequestId);
    }
  }, [documentRequestId]);

  const handleToggle = () => setToggle((prev) => !prev);

  const printTextCta = useMemo(() => {
    return toggle ? 'Hide' : 'Show';
  }, [toggle]);

  const handleSubmit = async (action) => {
    setActionLoading(true);
    try {
      await onSubmit({}, action);
    } finally {
      setActionLoading(false);
    }
  };

  // Role-based button configuration (only for owner)
  const getButtonConfig = () => {
    const isOwner = role === ROLES.OWNER;
    const buttons = [];

    if (isOwner) {
      if (['Pending', 'In Progress', 'Revision Requested'].includes(status)) {
        buttons.push({
          text: actionLoading ? 'Submitting...' : 'Submit to Broker',
          variant: 'primary',
          disabled: actionLoading,
          action: 'submit',
        });
      }
    }

    return buttons;
  };

  const buttonConfig = getButtonConfig();
  const statusConfig = getStatusConfig(status);

  // Determine if we should show the form
  const shouldShowForm = () => {
    const isOwner = role === ROLES.OWNER;
    const ongoingStatuses = ['Pending', 'In Progress', 'Documents Uploaded', 'Revision Requested'];
    return isOwner && ongoingStatuses.includes(status);
  };

  // Recalculate height when content changes
  const recalculateHeight = () => {
    if (contentRef.current) {
      if (toggle) {
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
  }, [toggle, countdownData, status, actionLoading]);

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

      {/* Countdown Timer Section - Show when countdown data exists and status is relevant */}
      {countdownData.taskId &&
        (status === 'Pending' ||
          status === 'In Progress' ||
          status === 'Revision Requested' ||
          status === 'Documents Uploaded') && (
          <div className="mt-4 flex flex-col items-start justify-center gap-y-3">
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

      <div className={`${toggle ? 'opacity-100' : 'py-0 opacity-0'} pt-5 transition-all duration-500`}>
        {/* Document Request Information */}
        {shouldShowForm() && (
          <div className="space-y-4">
            {/* Requested Documents List */}
            {requestedFiles && requestedFiles.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h6 className="mb-3 text-xsm font-medium text-gray-700">Requested Documents</h6>
                <div className="space-y-2">
                  {requestedFiles.map((file, index) => (
                    <div
                      key={typeof file === 'string' ? file : file.name || file.fileName || `file-${index}`}
                      className="flex items-center rounded-md bg-gray-50 px-3 py-2 text-xsm text-gray-700"
                    >
                      <UilInfoCircle size="16" className="mr-2 fill-gray-500" />
                      {typeof file === 'string' ? file : file.name || file.fileName || 'Unknown Document'}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section (if available) */}
            {comments && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h6 className="mb-3 text-xsm font-medium text-gray-700">Additional Comments</h6>
                <div className="rounded-md bg-gray-50 p-3 text-xsm text-gray-700">{comments}</div>
              </div>
            )}

            {/* Buttons section */}
            {buttonConfig.length > 0 && !disabled && (
              <div className="mt-6 flex justify-end gap-3">
                {buttonConfig.map((button) => (
                  <Button
                    key={button.text}
                    buttonProps={{
                      text: button.text,
                      variant: button.variant,
                      size: 'large',
                    }}
                    disabled={button.disabled}
                    onClick={() => handleSubmit(button.action)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PreFixtureDocumentRequestForm.propTypes = PreFixtureDocumentRequestFormPropTypes;

export default PreFixtureDocumentRequestForm;
