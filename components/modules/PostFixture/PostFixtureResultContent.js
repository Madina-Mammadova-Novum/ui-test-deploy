'use client';

import { PostFixtureResultContentPropTypes } from '@/lib/types';

import {
  postFixtureDetailsAdapter,
  postFixtureDocumentsTabRowsDataAdapter,
  postFixtureHeaderDataAdapter,
} from '@/adapters/post-fixture';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow, PostFixtureExpandedContent } from '@/modules';

const PostFixtureResultContent = ({ data, toggle, isOpened, tab }) => {
  const printExpandableRow = (rowData, index) => {
    const rowHeader = postFixtureHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        key={rowData?.id}
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        expand={index === 0 || toggle}
        isOpened={isOpened}
      >
        <PostFixtureExpandedContent
          tab={tab}
          detailsData={postFixtureDetailsAdapter({ data: rowData })}
          documentsData={postFixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  return <div className="flex flex-col gap-2.5">{data?.map(printExpandableRow)}</div>;
};

PostFixtureResultContent.propTypes = PostFixtureResultContentPropTypes;

export default PostFixtureResultContent;
