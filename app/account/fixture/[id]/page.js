import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { FixtureDetails } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Fixture Details',
      },
    },
  });
}

export default function Page({ params, searchParams }) {
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <FixtureDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
