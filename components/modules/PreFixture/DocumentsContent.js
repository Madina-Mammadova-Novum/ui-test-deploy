import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { prefixtureHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return <Table headerData={prefixtureHeader} rows={rowsData} />;
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
