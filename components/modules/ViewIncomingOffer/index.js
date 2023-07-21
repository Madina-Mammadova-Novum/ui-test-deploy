'use client';

import { useEffect, useState } from 'react';

import { ViewIncomingOfferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { NegotiatingAcceptOffer, SendCounteroffer, ViewOffer } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { OfferDeclineForm } from '@/units';

const ViewIncomingOffer = ({ closeModal, itemId }) => {
  const [step, setStep] = useState('view_offer');
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data }));
      } else {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  switch (step) {
    case 'offer_decline':
      return (
        <OfferDeclineForm
          title="Decline the Offer"
          closeModal={closeModal}
          goBack={() => setStep('view_offer')}
          showCancelButton={false}
          itemId={itemId}
        />
      );
    case 'offer_counteroffer':
      return <SendCounteroffer closeModal={closeModal} goBack={setStep} offerDetails={offerDetails} />;
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
      return <ViewOffer setStep={setStep} closeModal={closeModal} data={offerDetails} />;
  }
};

ViewIncomingOffer.propTypes = ViewIncomingOfferPropTypes;

export default ViewIncomingOffer;
