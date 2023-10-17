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

export default function Page({ params, searchParams }) {
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <NegotiatingDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
