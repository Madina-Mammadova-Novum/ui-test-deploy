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

const PostFixturePage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <PostFixture title="Post-fixture" />
    </AccountWrapper>
  );
};

export default PostFixturePage;
