'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FailTheSubsModalContentPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';
import { getOfferDetails } from '@/services/offer';
import { failTheSubs } from '@/services/on-subs';
import { getCurrentDealStage } from '@/store/entities/notifications/actions';
import { getCookieFromBrowser } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const FailTheSubsModalContent = ({ closeModal, offerId }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleFailTheSubs = async () => {
    setLoading(true);
    const { error, message: successMessage } = await failTheSubs({ data: { offerId } });
    setLoading(false);
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(successMessage);

      const role = getCookieFromBrowser('session-user-role');
      const { error: offerError } = await getOfferDetails(offerId, role);

      if (offerError) {
        return;
      }
      const resultAction = await dispatch(getCurrentDealStage({ id: offerId, role }));

      if (getCurrentDealStage.fulfilled.match(resultAction)) {
        const { route } = resultAction.payload;
        if (route) {
          window.location.href = route;
        }
      } else {
        console.error('Failed to get the current deal stage:', resultAction.payload);
      }

      closeModal();
    }
  };

  return (
    <div>
      <Title level={2}>Do you want to fail the Subs?</Title>
      <div className="mt-7 flex gap-x-2.5">
        <div className="w-full">
          <Button
            onClick={closeModal}
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
            customStyles="w-full whitespace-nowrap"
          />
        </div>
        <div className="w-full">
          <Button
            buttonProps={{
              text: loading ? 'Please wait...' : 'Fail the Subs',
              variant: 'delete',
              size: 'large',
            }}
            customStyles="w-full whitespace-nowrap"
            onClick={handleFailTheSubs}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

FailTheSubsModalContent.propTypes = FailTheSubsModalContentPropTypes;

export default FailTheSubsModalContent;
