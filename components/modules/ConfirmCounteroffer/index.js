'use client';

import { useState } from 'react';

import { ConfirmCounterofferPropTypes } from '@/lib/types';

import { CommentsContent } from '@/modules';
import { COTTabContent, VoyageDetailsTabContent } from '@/units';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const ConfirmCounteroffer = () => {
  const [showScroll, setShowScroll] = useState(false);
  return (
    <div className="w-[610px]">
      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] flex flex-col gap-y-5 mt-2.5 overflow-y-auto overflow-x-hidden ${
          showScroll && 'shadow-vInset'
        }`}
      >
        <COTTabContent data={COTData} />
        <VoyageDetailsTabContent data={voyageDetailData} />
        <CommentsContent data={incomingOfferCommentsData} areaDisabled />
      </div>
    </div>
  );
};

ConfirmCounteroffer.propTypes = ConfirmCounterofferPropTypes;

export default ConfirmCounteroffer;
