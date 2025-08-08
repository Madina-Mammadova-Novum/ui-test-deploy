'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UilFileInfoAlt } from '@iconscout/react-unicons';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { approveExtensionRequest, rejectExtensionRequest } from '@/services/assignedTasks';
import { getPdfToView } from '@/services/offer';
import { updateDealData } from '@/store/entities/notifications/slice';
import { updateCountdown, updateDeals } from '@/store/entities/on-subs/slice';
import { getAuthSelector } from '@/store/selectors';
import { ConfirmModal, ExtendCountdown, ModalWindow, Tabs } from '@/units';
import { transformDate } from '@/utils/date';
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
  const dispatch = useDispatch();
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

      // Update the local state
      const extendedMinutes = pendingExtensionRequest?.requestedMinutes || 0;
      dispatch(updateCountdown({ offerId, extendMinute: extendedMinutes }));

      // Update the deal data - clear extension requests
      dispatch(
        updateDeals({
          offerId,
          updates: {
            allowExtension: false,
            extensionRequests: [],
          },
        })
      );

      // Update the deal data in notifications state with extended countdown
      const extendMinutesInMs = extendedMinutes * 60 * 1000; // Convert minutes to milliseconds
      const currentExpiresAt = detailsData?.expiresAt;
      let newExpiresAt = null;

      if (currentExpiresAt) {
        newExpiresAt = transformDate(
          new Date(currentExpiresAt).getTime() + extendMinutesInMs,
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        );
      }

      dispatch(
        updateDealData({
          dealId: offerId,
          allowExtension: false,
          extensionRequests: [],
          ...(newExpiresAt && { expiresAt: newExpiresAt, countdownStatus: 'Running', isCountdownActive: true }),
        })
      );

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

      // Update the deal data - clear extension requests
      dispatch(
        updateDeals({
          offerId,
          updates: {
            allowExtension: false,
            extensionRequests: [],
          },
        })
      );

      // Update the deal data in notifications state
      dispatch(
        updateDealData({
          dealId: offerId,
          allowExtension: false,
          extensionRequests: [],
        })
      );

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

  const handleViewRecap = async () => {
    setIsLoading(true);
    try {
      const response = await getPdfToView(offerId);
      if (response?.error) {
        throw new Error(response?.error?.message || 'Failed to get recap');
      }
      if (!response?.data) {
        errorToast('View Error', 'No PDF data found in response');
        return;
      }

      // Open received PDF blob in a new tab directly
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);

      if (!objectUrl) {
        errorToast('View Error', 'No PDF data found in response');
        return;
      }

      window.open(objectUrl, '_blank', 'noopener');

      // Revoke after opening
      setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    } catch (error) {
      errorToast('View Error', error?.message || 'Failed to open recap');
    } finally {
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
      <div
        className={`py-16 2md:py-10 3md:py-8 ${hasApprovalPermission() && detailsData?.extensionRequests?.length > 0 ? '2md:h-36 2mdMax:h-48 lg:h-32' : ''}`}
      >
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />

        <div className="absolute right-1/2 top-14 flex translate-x-1/2 flex-col items-center gap-2 2md:right-1 2md:top-3 2md:-translate-x-5 2md:items-end">
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
              variant: 'primary',
              size: 'small',
              icon: { before: <UilFileInfoAlt size="14" className="fill-blue" /> },
            }}
            customStyles="border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold"
            onClick={handleViewRecap}
            disabled={isLoading}
          />

          {/* Approve/Reject Extension Buttons - Show only if user is the initiator */}
          {detailsData?.extensionRequests?.length > 0 && detailsData?.taskId && hasApprovalPermission() && (
            <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-3 2md:mt-3 lg:mt-0">
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
          )}
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
