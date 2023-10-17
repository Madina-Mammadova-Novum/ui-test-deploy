import { UrlPropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { PostFixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Post Fixture',
      },
    },
  });
}

export default function Page() {
  return <PostFixture />;
}

Page.propTypes = UrlPropTypes;
