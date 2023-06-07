import { FleetsExpandedContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fleetsPageHeader } from '@/utils/mock';

const FleetsExpandedContent = ({ rowsData = [] }) => {
  return (
    <div className="mt-3">
      <Table headerData={fleetsPageHeader} rows={rowsData} noDataMessage="This Fleet has no Tankers" />
    </div>
  );
};

FleetsExpandedContent.propTypes = FleetsExpandedContentPropTypes;

export default FleetsExpandedContent;
