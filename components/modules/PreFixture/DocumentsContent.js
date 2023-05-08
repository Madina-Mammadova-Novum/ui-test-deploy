import { Table } from '@/elements';
import { documentsContentPropTypes } from '@/lib/types';
import { prefixtureHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [] }) => {
  return <Table headerData={prefixtureHeader} rows={rowsData} />;
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
