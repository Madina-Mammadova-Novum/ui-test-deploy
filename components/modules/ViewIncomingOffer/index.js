'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewIncomingOfferPropTypes } from '@/lib/types';

import { extendCountdownDataAdapter } from '@/adapters/countdownTimer';
import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { NegotiatingAcceptOffer, SendCounteroffer, ViewOffer } from '@/modules';
import { getAssignedTasks, getTaskExtensionTimeOptions } from '@/services/assignedTasks';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { OfferDeclineForm } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ViewIncomingOffer = ({ closeModal, itemId, cellData, minimizeModal }) => {
  const [step, setStep] = useState('view_offer');
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});

  const { role } = useSelector(getUserDataSelector);

  const { parentId } = cellData || {};

  const handleCountdownExtensionSuccess = (extendMinutes) => {
    setOfferDetails((prevOfferDetails) => extendCountdownDataAdapter(prevOfferDetails, extendMinutes));
  };

  const initActions = async () => {
    const { status, data, error } = await getOfferDetails(itemId, role);
    if (status === 200) {
      try {
        // Fetch assigned tasks for countdown data
        const assignedTasksResponse = await getAssignedTasks({
          targetId: itemId,
          purpose: 'Negotiating',
        });

        // Prefer the task with status "Created" assigned to current user; otherwise fallback
        const tasks = assignedTasksResponse?.data || [];
        const currentUserId = getCookieFromBrowser('session-user-id');
        const createdTask =
          tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
          tasks.find((task) => task.status === 'Created') ||
          tasks[0];

        const expiresAt = createdTask?.countdownTimer?.expiresAt;
        const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';
        const taskId = createdTask?.id;

        // Fetch extension time options if we have a task ID
        let allowExtension = false;
        let extensionTimeOptions = [];

        if (taskId) {
          try {
            const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
            allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
            extensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];
          } catch (extensionError) {
            console.error('Error fetching extension time options:', extensionError);
          }
        }

        // Enhance the offer data with countdown information from assigned tasks
        const enhancedData = {
          ...data,
          expiresAt,
          countdownStatus,
          allowExtension,
          extensionTimeOptions,
          taskId,
        };

        setOfferDetails(offerDetailsAdapter({ data: enhancedData, role }));
      } catch (assignedTasksError) {
        console.error('Error fetching assigned tasks:', assignedTasksError);
        // Fallback to original data if assigned tasks fetch fails
        setOfferDetails(offerDetailsAdapter({ data, role }));
      }
    } else {
      errorToast(error.title, error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    initActions();
  }, []);

  useEffect(() => {
    if (step === 'offer_decline') minimizeModal(true);

    return () => {
      minimizeModal(false);
    };
  }, [step]);

  if (loading) {
    return (
      <div className="relative flex h-full w-72 items-center justify-center">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  switch (step) {
    case 'offer_decline':
      return (
        <OfferDeclineForm
          title="Decline the Offer"
          closeModal={closeModal}
          goBack={() => setStep('view_offer')}
          showCancelButton={false}
          itemId={itemId}
          parentId={parentId}
          offerDetails={offerDetails}
        />
      );
    case 'offer_counteroffer':
      return <SendCounteroffer closeModal={closeModal} goBack={setStep} offerDetails={offerDetails} dealId={itemId} />;
    case 'offer_accept':
      return (
        <NegotiatingAcceptOffer
          closeModal={closeModal}
          goBack={() => setStep('view_offer')}
          itemId={itemId}
          offerDetails={offerDetails}
        />
      );
    default:
      return (
        <ViewOffer
          setStep={setStep}
          data={offerDetails}
          offerId={itemId}
          parentId={parentId}
          handleCountdownExtensionSuccess={handleCountdownExtensionSuccess}
        />
      );
  }
};

ViewIncomingOffer.propTypes = ViewIncomingOfferPropTypes;

export default ViewIncomingOffer;
