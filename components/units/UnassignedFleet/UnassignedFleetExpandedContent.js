import { UnassignedFleetExpandedContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { unassignedFleetHeader } from '@/utils/mock';

const UnassignedFleetExpandedContent = ({ rowsData = [] }) => {
  return (
    <div className="mt-3 table-scroll">
      <Table headerData={unassignedFleetHeader} rows={rowsData} noDataMessage="This Fleet has no Tankers" />
    </div>
  );
};

UnassignedFleetExpandedContent.propTypes = UnassignedFleetExpandedContentPropTypes;

export default UnassignedFleetExpandedContent;
