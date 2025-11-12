'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UilCheck, UilClock, UilEye, UilFileInfoAlt, UilTimes } from '@iconscout/react-unicons';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

import { IconButtonWithTooltip } from '@/elements';
import { PAGE_STATE, ROLES } from '@/lib/constants';
import { approveExtensionRequest, rejectExtensionRequest } from '@/services/assignedTasks';
import { getPdfToView } from '@/services/offer';
import { updateDealData } from '@/store/entities/notifications/slice';
import { fetchOnSubsOffers } from '@/store/entities/on-subs/actions';
import { updateCountdown, updateDeals } from '@/store/entities/on-subs/slice';
import { getAuthSelector } from '@/store/selectors';
import { AdminChangeRequestsModal, ConfirmModal, ExtendCountdown, ModalWindow, Tabs } from '@/units';
import { transformDate } from '@/utils/date';
import { errorToast, successToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'documents',
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

  // Refetch on-subs offers after successful approve/reject
  const handleRefetchOffers = () => {
    const { page, pageSize } = PAGE_STATE;
    dispatch(fetchOnSubsOffers({ page, perPage: pageSize }));
  };

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

  const hasChangeRequests = detailsData?.requests && detailsData.requests.length > 0;

  return (
    <>
      <div className="py-[3.75rem] 2md:py-8">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />

        <div className="absolute left-1/2 top-14 flex -translate-x-1/2 flex-row items-center gap-2 2md:left-auto 2md:right-5 2md:top-3 2md:translate-x-0">
          {/* Extend Countdown Button */}
          {detailsData?.taskId && detailsData?.allowExtension && hasExtensionPermission() && (
            <ModalWindow
              buttonComponent={
                <IconButtonWithTooltip
                  icon={<UilClock size="18" className="fill-blue" />}
                  tooltipText="Request response time extension"
                  disabled={!allowCountdownExtension}
                />
              }
            >
              <ExtendCountdown
                offerId={offerId}
                taskId={detailsData?.taskId}
                onExtensionSuccess={() => setAllowCountdownExtension(false)}
                options={detailsData?.extensionTimeOptions || []}
              />
            </ModalWindow>
          )}

          <IconButtonWithTooltip
            icon={<UilFileInfoAlt size="18" className="fill-blue" />}
            tooltipText={isLoading ? 'Loading...' : 'Recap'}
            onClick={handleViewRecap}
            disabled={isLoading}
            loading={isLoading}
          />

          {/* Review Change Requests Button */}
          {hasChangeRequests && (
            <ModalWindow
              buttonComponent={
                <IconButtonWithTooltip
                  icon={<UilEye size="18" className="fill-blue" />}
                  tooltipText="Review deal information changes"
                />
              }
            >
              <AdminChangeRequestsModal
                requests={detailsData.requests}
                cargoId={detailsData.cargoCode || 'CARGO-###'}
                onSuccess={handleRefetchOffers}
              />
            </ModalWindow>
          )}

          {/* Approve/Reject Extension Buttons - Show only if user is the initiator */}
          {detailsData?.extensionRequests?.length > 0 && detailsData?.taskId && hasApprovalPermission() && (
            <div className="flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-sm">
              <p className="whitespace-nowrap text-xs text-gray-700">
                {session?.role === ROLES.OWNER ? 'Charterer' : 'Owner'} requests{' '}
                <span className="font-semibold text-black">{pendingExtensionRequest?.requestedMinutes}min</span>
              </p>

              <div className="flex gap-1.5">
                <IconButtonWithTooltip
                  icon={<UilCheck size="16" className="fill-green-600" />}
                  tooltipText="Approve extension"
                  onClick={showApproveModal}
                  disabled={actionLoading}
                  className="!border-green-500 !p-1.5 hover:!border-green-600 hover:!bg-green-50"
                />
                <IconButtonWithTooltip
                  icon={<UilTimes size="16" className="fill-red-600" />}
                  tooltipText="Reject extension"
                  onClick={showRejectModal}
                  disabled={actionLoading}
                  className="!border-red-500 !p-1.5 hover:!border-red-600 hover:!bg-red-50"
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
