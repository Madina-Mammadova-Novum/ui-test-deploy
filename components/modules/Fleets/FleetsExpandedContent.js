import { FleetsExpandedContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fleetsPageHeader } from '@/utils/mock';

const FleetsExpandedContent = ({ rowsData = [], fleetId }) => {
  return (
    <div className="mt-3 table-scroll">
      <Table
        headerData={fleetsPageHeader}
        rows={rowsData}
        noDataMessage="This Fleet has no Tankers"
        fleetId={fleetId}
      />
    </div>
  );
};

FleetsExpandedContent.propTypes = FleetsExpandedContentPropTypes;

export default FleetsExpandedContent;
