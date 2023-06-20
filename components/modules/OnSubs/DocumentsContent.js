import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="mt-2.5">
      <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
