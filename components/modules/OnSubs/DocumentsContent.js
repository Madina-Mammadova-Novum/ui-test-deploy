import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { UploadForm } from '@/units';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <UploadForm />
      <div className="table-scroll">
        <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
