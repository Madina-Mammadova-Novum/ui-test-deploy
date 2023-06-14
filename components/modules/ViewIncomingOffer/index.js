'use client';

import { useState } from 'react';

import { ViewIncomingOfferPropTypes } from '@/lib/types';

import { NegotiatingAcceptOffer, SendCounteroffer, ViewOffer } from '@/modules';
import { OfferDeclineForm } from '@/units';

const ViewIncomingOffer = ({ closeModal }) => {
  const [step, setStep] = useState('view_offer');

  switch (step) {
    case 'offer_decline':
      return (
        <OfferDeclineForm
          title="Decline the Offer"
          closeModal={closeModal}
          goBack={() => setStep('view_offer')}
          showCancelButton={false}
        />
      );
    case 'offer_counteroffer':
      return <SendCounteroffer closeModal={closeModal} goBack={setStep} />;
    case 'offer_accept':
      return <NegotiatingAcceptOffer closeModal={closeModal} goBack={() => setStep('view_offer')} />;
    default:
      return <ViewOffer setStep={setStep} closeModal={closeModal} />;
  }
};

ViewIncomingOffer.propTypes = ViewIncomingOfferPropTypes;

export default ViewIncomingOffer;
