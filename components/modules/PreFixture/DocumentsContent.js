import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { prefixtureHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="table-scroll pt-2.5">
      <Table headerData={prefixtureHeader} rows={rowsData} noDataMessage="No Documents Provided" />
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
