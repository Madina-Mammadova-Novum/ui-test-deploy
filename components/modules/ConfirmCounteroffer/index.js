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
  const { commercialOfferTerms } = confirmCounterofferDetailsAdapter({ data: getValues() });

  return (
    <div className="w-[610px]">
      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] flex flex-col gap-y-5 mt-2.5 overflow-y-auto overflow-x-hidden ${
          showScroll && 'shadow-vInset'
        }`}
      >
        <COTTabContent data={commercialOfferTerms} />
        <VoyageDetailsTabContent data={voyageDetails} />
        <CommentsContent data={comments} areaDisabled />
      </div>
    </div>
  );
};

ConfirmCounteroffer.propTypes = ConfirmCounterofferPropTypes;

export default ConfirmCounteroffer;
