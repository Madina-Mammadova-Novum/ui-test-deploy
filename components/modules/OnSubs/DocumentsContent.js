import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { UploadForm } from '@/units';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return (
    <>
      <UploadForm />
      <div className="mt-2.5">
        <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
