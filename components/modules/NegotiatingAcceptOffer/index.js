'use client';

import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';
import * as yup from 'yup';

import { NegotiatingAcceptOfferPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import { acceptOfferSchema } from '@/lib/schemas';
import { CommentsContent } from '@/modules';
import { acceptOffer } from '@/services/offer';
import { refetchNegotiatingOffers } from '@/store/entities/negotiating/slice';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const tabs = [
  {
    value: 'message',
    label: 'Message',
  },
  {
    value: 'offer_details',
    label: 'Offer details',
  },
];

const schema = yup.object({
  ...acceptOfferSchema(),
});

const NegotiatingAcceptOffer = ({ closeModal, goBack, itemId, offerDetails }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const { data: session } = useSession();
  const methods = useHookFormParams({ schema });
  const dispatch = useDispatch();
  const { comments, voyageDetails, commercialOfferTerms, countdown } = offerDetails;

  const handleSubmit = async (formData) => {
    const { message: successMessage, error } = await acceptOffer({
      data: { ...formData, offerId: itemId },
      role: session?.role,
    });

    if (!error) {
      successToast(successMessage);
      dispatch(refetchNegotiatingOffers());
      closeModal();
    } else {
      const { errors } = error;
      errorToast(parseErrors(errors));
    }
  };

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'offer_details':
        return <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />;
      default:
        return <CommentsContent data={comments} areaDisabled />;
    }
  }, [currentTab]);

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={goBack}>Accept the offer</ModalHeader>

      <Countdown time={countdown} customStyles="mt-5" />

      <Tabs
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="mx-auto mt-5"
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] mt-3 overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        <FormProvider {...methods}>
          <FormManager
            submitAction={handleSubmit}
            className="!gap-0"
            submitButton={{
              text: 'Accept the offer',
              variant: 'primary',
              size: 'large',
              className: 'absolute bottom-8 right-8 text-xsm !w-max z-[1] !w-40',
            }}
          >
            {tabContent}
          </FormManager>
        </FormProvider>
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4 justify-end h-10">
        <Button
          buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large' }}
          customStyles="opacity-0"
        />
      </div>
    </div>
  );
};

NegotiatingAcceptOffer.propTypes = NegotiatingAcceptOfferPropTypes;

export default NegotiatingAcceptOffer;
