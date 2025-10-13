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

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const urlParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <AccountPositionDetails searchedParams={urlParams} />;
}

Page.propTypes = UrlPropTypes;
