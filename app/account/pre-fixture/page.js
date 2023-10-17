import { UrlPropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { AccountWrapper, PreFixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Pre Fixture',
      },
    },
  });
}

const PreFixturePage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <PreFixture />
    </AccountWrapper>
  );
};

PreFixturePage.propTypes = UrlPropTypes;

export default PreFixturePage;
