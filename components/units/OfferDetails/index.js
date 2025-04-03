/**
 * @component OfferDetails
 * @description Displays offer details including voyage details, additional discharge options, and commercial terms
 * @maritime Shows maritime offer information and discharge options
 */

import { OfferDetailsPropTypes } from '@/lib/types';

import { COTTabContent, VoyageDetailsTabContent } from '@/units';

const OfferDetails = ({ voyageDetails, commercialOfferTerms }) => {
  return (
    <div className="flex flex-col gap-y-5 py-4">
      <VoyageDetailsTabContent data={voyageDetails} isViewing />
      <COTTabContent data={commercialOfferTerms} />
    </div>
  );
};

OfferDetails.propTypes = OfferDetailsPropTypes;

export default OfferDetails;
