import { OfferDetailsPropTypes } from '@/lib/types';

import { COTTabContent, VoyageDetailsTabContent } from '@/units';

const OfferDetails = ({ voyageDetails, commercialOfferTerms }) => {
  return (
    <div className="flex flex-col gap-y-5 py-4">
      <VoyageDetailsTabContent data={voyageDetails} />
      <COTTabContent data={commercialOfferTerms} />
    </div>
  );
};

OfferDetails.propTypes = OfferDetailsPropTypes;

export default OfferDetails;
