'use client';

import {
  postFixtureDetailsAdapter,
  postFixtureDocumentsTabRowsDataAdapter,
  postFixtureHeaderDataAdapter,
} from '@/adapters/post-fixture';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow, PostFixtureExpandedContent } from '@/modules';

const PostFixtureResultContent = ({ data, toggle, isOpened, tab }) => {
  const printExpandableRow = (rowData) => {
    const rowHeader = postFixtureHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        expand={toggle}
        isOpened={isOpened}
      >
        <PostFixtureExpandedContent
          offerId={rowData?.id}
          tab={tab}
          detailsData={postFixtureDetailsAdapter({ data: rowData })}
          documentsData={postFixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  return <div className="flex flex-col gap-2.5">{data?.map(printExpandableRow)}</div>;
};

PostFixtureResultContent.propTypes = PostFixtureResultContent;

export default PostFixtureResultContent;
