'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { ViewIncomingOfferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { NegotiatingAcceptOffer, SendCounteroffer, ViewOffer } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { OfferDeclineForm } from '@/units';

const ViewIncomingOffer = ({ closeModal, itemId }) => {
  const [step, setStep] = useState('view_offer');
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId, session?.role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data }));
      } else {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );

  switch (step) {
    case 'offer_decline':
      return (
        <OfferDeclineForm
          title="Decline the Offer"
          closeModal={closeModal}
          goBack={() => setStep('view_offer')}
          showCancelButton={false}
          itemId={itemId}
          offerDetails={offerDetails}
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
