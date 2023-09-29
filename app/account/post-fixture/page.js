import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountWrapper, PostFixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Post Fixture',
      },
    },
  });
}

const PostFixturePage = ({ searchParams }) => {
  const urlParams = searchParamsAdapter({ data: searchParams });
  return (
    <AccountWrapper containerClass="px-5">
      <PostFixture searchParams={urlParams} />
    </AccountWrapper>
  );
};

PostFixturePage.propTypes = UrlPropTypes;

export default PostFixturePage;
