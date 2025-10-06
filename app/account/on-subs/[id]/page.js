import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { OnSubsDetails } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'On-Subs Details',
      },
    },
  });
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <OnSubsDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
