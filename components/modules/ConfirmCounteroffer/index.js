'use client';

import { useState } from 'react';

import { ConfirmCounterofferPropTypes } from '@/lib/types';

import { confirmCounterofferDetailsAdapter } from '@/adapters/offer';
import { CommentsContent } from '@/modules';
import { COTTabContent, VoyageDetailsTabContent } from '@/units';
import { useHookForm } from '@/utils/hooks';

const ConfirmCounteroffer = ({ offerDetails }) => {
  const [showScroll, setShowScroll] = useState(false);
  const { getValues } = useHookForm();
  const { voyageDetails, comments } = offerDetails;
  const { commercialOfferTerms, comment } = confirmCounterofferDetailsAdapter({ data: getValues() });

  const formData = getValues();
  const nextVoyageDetails = {
    ...voyageDetails,
    additionalDischargeOptions: {
      ...voyageDetails?.additionalDischargeOptions,
      ...formData?.additionalDischargeOptions,
    },
  };

  return (
    <div
      ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
      className={`mt-2.5 flex flex-1 flex-col gap-y-5 overflow-y-auto overflow-x-hidden ${
        showScroll && 'shadow-vInset'
      }`}
    >
      <COTTabContent data={commercialOfferTerms} />
      <VoyageDetailsTabContent data={nextVoyageDetails} isCounteroffer isViewing />
      <CommentsContent data={[...comments, comment]} areaDisabled />
    </div>
  );
};

ConfirmCounteroffer.propTypes = ConfirmCounterofferPropTypes;

export default ConfirmCounteroffer;
