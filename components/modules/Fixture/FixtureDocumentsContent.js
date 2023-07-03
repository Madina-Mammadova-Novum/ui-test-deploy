import { FixtureDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { UploadForm } from '@/units';
import { fixtureHeader } from '@/utils/mock';

const FixtureDocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <UploadForm />
      <div className="table-scroll">
        <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

FixtureDocumentsContent.propTypes = FixtureDocumentsContentPropTypes;

export default FixtureDocumentsContent;
