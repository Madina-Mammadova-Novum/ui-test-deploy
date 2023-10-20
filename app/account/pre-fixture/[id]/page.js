import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { PreFixtureDetails } from '@/modules';

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
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <PreFixtureDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
