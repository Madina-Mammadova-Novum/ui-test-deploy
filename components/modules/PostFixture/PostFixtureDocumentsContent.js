import { PostFixtureDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { fixtureHeader } from '@/utils/mock';

const PostFixtureDocumentsContent = ({ rowsData = [] }) => {
  return (
    <div className="mt-2.5 flex flex-col gap-y-2.5">
      <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
    </div>
  );
};

PostFixtureDocumentsContent.propTypes = PostFixtureDocumentsContentPropTypes;

export default PostFixtureDocumentsContent;
