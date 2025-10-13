import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { Fleets } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Fleet Management',
      },
    },
  });
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const searchedParams = searchParamsAdapter({ data: searchParams });

  return <Fleets searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
