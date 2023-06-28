import { FixtureDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fixtureHeader } from '@/utils/mock';

const FixtureDocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="mt-2.5 flex flex-col gap-y-2.5">
      <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
    </div>
  );
};

FixtureDocumentsContent.propTypes = FixtureDocumentsContentPropTypes;

export default FixtureDocumentsContent;
