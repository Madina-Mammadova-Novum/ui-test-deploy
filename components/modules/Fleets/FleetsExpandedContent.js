import { FleetsExpandedContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fleetsPageHeader } from '@/utils/mock';

const FleetsExpandedContent = ({ rowsData = [], urlAction, fleetId }) => {
  return (
    <div className="mt-3">
      <Table
        headerData={fleetsPageHeader}
        urlAction={urlAction}
        rows={rowsData}
        noDataMessage="This Fleet has no Tankers"
        fleetId={fleetId}
      />
    </div>
  );
};

FleetsExpandedContent.propTypes = FleetsExpandedContentPropTypes;

export default FleetsExpandedContent;
