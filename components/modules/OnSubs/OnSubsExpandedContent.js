'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { UilFileInfoAlt } from '@iconscout/react-unicons';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { approveExtensionRequest, rejectExtensionRequest } from '@/services/assignedTasks';
import { getPdfToPrint } from '@/services/offer';
import { getAuthSelector } from '@/store/selectors';
import { ConfirmModal, ExtendCountdown, ModalWindow, Tabs } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'document',
  },
];

const OnSubsExpandedContent = ({ detailsData = {}, documentsData = [], offerId, tab = 'details' }) => {
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0].value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(detailsData?.allowExtension);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const { session } = useSelector(getAuthSelector);

  // Get pending extension request from detailsData
  const pendingExtensionRequest = useMemo(() => {
    const extensionRequests = detailsData?.extensionRequests || [];
    const pendingRequest = extensionRequests.find((request) => request.status === 'Pending');
    return pendingRequest
      ? {
          targetId: pendingRequest.id,
          requestedMinutes: pendingRequest.requestedMinutes,
        }
      : null;
  }, [detailsData?.extensionRequests]);

  // Check if current user has permission to extend countdown
  const hasExtensionPermission = () => {
    if (!detailsData?.assignTo || !session) return false;

    const { assignTo } = detailsData;
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
    if (!detailsData?.initiator || !session || !pendingExtensionRequest) return false;

    const { initiator } = detailsData;
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
      // Note: In a real implementation, you might want to refresh the data here
      // For now, we'll just disable the buttons to indicate the action was taken
      setAllowCountdownExtension(false);
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
      // Note: In a real implementation, you might want to refresh the data here
      // For now, we'll just disable the buttons to indicate the action was taken
      setAllowCountdownExtension(false);
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
    handleApproveExtension(pendingExtensionRequest?.targetId);
    setIsApproveModalOpen(false);
  };

  // Handle confirm reject
  const handleConfirmReject = () => {
    handleRejectExtension(pendingExtensionRequest?.targetId);
    setIsRejectModalOpen(false);
  };

  const handlePrint = async () => {
    setIsLoading(true);
    let pdfUrl;
    let iframe;

    try {
      const response = await getPdfToPrint(offerId);

      if (!response?.data) {
        errorToast('Print Error', 'No PDF data found in response');
        return;
      }

      // Create blob URL
      const blob = new Blob([response.data], { type: 'application/pdf' });
      pdfUrl = URL.createObjectURL(blob);

      // Create temporary iframe
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = pdfUrl;

      let printTimeout;

      // Wait for iframe to load then print
      await new Promise((resolve, reject) => {
        iframe.onload = () => {
          try {
            iframe.contentWindow.print();
            printTimeout = setTimeout(() => {
              errorToast('Print Error', 'Print dialog failed to open - timeout');
            }, 10000);
            resolve();
          } catch (error) {
            errorToast('Print Error', 'Failed to open print dialog');
            reject(new Error('Failed to open print dialog'));
          } finally {
            clearTimeout(printTimeout);
            iframe.onload = null;
          }
        };
      });
    } catch (error) {
      errorToast('Print Error', error.message);
    } finally {
      // Cleanup
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setIsLoading(false);
    }
  };

  const printContent = useMemo(() => {
    if (currentTab === tabs[1].value) {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    return <DetailsContent detailsData={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  return (
    <>
      <div className={`py-16 2md:py-10 3md:py-8 ${hasApprovalPermission() && 'lg:h-28 lgMax:h-36'}`}>
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        {/* Approve/Reject Extension Buttons - Show only if user is the initiator */}
        {detailsData?.extensionRequests?.length > 0 && detailsData?.taskId && hasApprovalPermission() && (
          <div className="absolute left-5 top-14 lg:top-3">
            <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-3">
              <p className="text-xsm">
                You have a pending extension request for{' '}
                <span className="font-semibold">{pendingExtensionRequest?.requestedMinutes} minutes</span>
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
          </div>
        )}
        <div
          className={`absolute top-14 flex flex-col items-end gap-2 2md:right-1 2md:top-3 2md:-translate-x-5 3md:flex-row 3md:items-center ${hasApprovalPermission() ? 'right-1 -translate-x-5' : 'right-1/2 translate-x-1/2'}`}
        >
          {/* Extend Countdown Button */}
          {detailsData?.taskId && detailsData?.allowExtension && hasExtensionPermission() && (
            <ModalWindow
              buttonProps={{
                text: 'Request response time extension',
                variant: 'primary',
                size: 'small',
                disabled: !allowCountdownExtension,
                className:
                  'border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold',
              }}
            >
              <ExtendCountdown
                offerId={offerId}
                taskId={detailsData?.taskId}
                onExtensionSuccess={() => setAllowCountdownExtension(false)}
                options={detailsData?.extensionTimeOptions || []}
              />
            </ModalWindow>
          )}

          <Button
            buttonProps={{
              text: isLoading ? 'Loading...' : 'Recap',
              variant: 'tertiary',
              size: 'large',
              icon: { before: <UilFileInfoAlt size="20" className="fill-black" /> },
            }}
            customStyles="!text-black"
            onClick={handlePrint}
            disabled={isLoading}
          />
        </div>
      </div>
      {printContent}

      {/* Approve Extension Confirmation Modal */}
      <ConfirmModal
        isOpen={isApproveModalOpen}
        onConfirm={handleConfirmApprove}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Extension Request"
        message="Are you sure you want to approve this extension request? This will extend the response deadline."
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
    </>
  );
};

OnSubsExpandedContent.propTypes = OnSubsExpandedContentPropTypes;

export default OnSubsExpandedContent;
