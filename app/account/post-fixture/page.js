import { UrlPropTypes } from '@/lib/types';

import { searachParamsAdapter } from '@/adapters';
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
  const urlParams = searachParamsAdapter({ data: searchParams });
  return (
    <AccountWrapper containerClass="px-5">
      <PostFixture searchParams={urlParams} />
    </AccountWrapper>
  );
};

PostFixturePage.propTypes = UrlPropTypes;

export default PostFixturePage;
