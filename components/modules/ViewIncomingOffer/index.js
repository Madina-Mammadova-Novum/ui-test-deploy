'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewIncomingOfferPropTypes } from '@/lib/types';

import { extendCountdownDataAdapter } from '@/adapters/countdownTimer';
import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { NegotiatingAcceptOffer, SendCounteroffer, ViewOffer } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { OfferDeclineForm } from '@/units';
import { errorToast } from '@/utils/hooks';

const ViewIncomingOffer = ({ closeModal, itemId, cellData }) => {
  const [step, setStep] = useState('view_offer');
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});

  const { role } = useSelector(getUserDataSelector);

  const { parentId } = cellData || {};

  const handleCountdownExtensionSuccess = () => setOfferDetails(extendCountdownDataAdapter);

  const initActions = async () => {
    const { status, data, error } = await getOfferDetails(itemId, role);
    if (status === 200) {
      setOfferDetails(offerDetailsAdapter({ data, role }));
    } else {
      errorToast(error.title, error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    initActions();
  }, []);

  if (loading) {
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
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
          closeModal={closeModal}
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
