import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { Fleets } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Tanker list',
      },
    },
  });
}

export default function Page({ searchParams }) {
  const searchedParams = searchParamsAdapter({ data: searchParams });

  return <Fleets searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
