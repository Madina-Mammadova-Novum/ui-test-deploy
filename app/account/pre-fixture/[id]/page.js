import { UrlPropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { AccountWrapper, PreFixtureDetails } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Pre Fixture Details',
      },
    },
  });
}

export default function Page({ params, searchParams }) {
  const data = { id: params.id, ...searchParams };

  return (
    <AccountWrapper containerClass="px-5">
      <PreFixtureDetails searchedParams={data} />
    </AccountWrapper>
  );
}

Page.propTypes = UrlPropTypes;
