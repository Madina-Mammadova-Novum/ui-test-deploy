import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { NegotiatingDetails } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Negotiating Details',
      },
    },
  });
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <NegotiatingDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
