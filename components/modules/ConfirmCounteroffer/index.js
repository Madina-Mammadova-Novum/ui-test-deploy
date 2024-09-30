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

  return (
    <div className="flex h-full w-[610px] flex-col">
      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`mt-2.5 flex h-[28.375rem] flex-col gap-y-5 overflow-y-auto overflow-x-hidden 3md:h-[33.75rem] lg:h-[40.5rem] ${
          showScroll && 'shadow-vInset'
        }`}
      >
        <COTTabContent data={commercialOfferTerms} />
        <VoyageDetailsTabContent data={voyageDetails} />
        <CommentsContent data={[...comments, comment]} areaDisabled />
      </div>
    </div>
  );
};

ConfirmCounteroffer.propTypes = ConfirmCounterofferPropTypes;

export default ConfirmCounteroffer;
