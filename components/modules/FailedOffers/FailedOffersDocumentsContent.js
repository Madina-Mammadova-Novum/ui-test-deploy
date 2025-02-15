import { FailedOffersDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fixtureHeader } from '@/utils/mock';

const FailedOffersDocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="flex flex-col gap-y-5 pb-3">
      <div className="table-scroll">
        <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

FailedOffersDocumentsContent.propTypes = FailedOffersDocumentsContentPropTypes;

export default FailedOffersDocumentsContent;
