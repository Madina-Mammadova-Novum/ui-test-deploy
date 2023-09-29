import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
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

const PreFixturePage = ({ searchParams }) => {
  const urlParams = searchParamsAdapter({ data: searchParams });

  return (
    <AccountWrapper containerClass="px-5">
      <PreFixture searchParams={urlParams} />
    </AccountWrapper>
  );
};

PreFixturePage.propTypes = UrlPropTypes;

export default PreFixturePage;
