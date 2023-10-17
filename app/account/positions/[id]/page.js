import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountPositionDetails } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Position Details',
      },
    },
  });
}

export default function Page({ params, searchParams }) {
  const urlParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <AccountPositionDetails searchedParms={urlParams} />;
}

Page.propTypes = UrlPropTypes;
