import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountPositions } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Positions',
      },
    },
  });
}

export default function Page({ params, searchParams }) {
  const urlParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <AccountPositions searchedParams={urlParams} />;
}

Page.propTypes = UrlPropTypes;
