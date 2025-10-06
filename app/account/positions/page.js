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

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const urlParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <AccountPositions searchedParams={urlParams} />;
}

Page.propTypes = UrlPropTypes;
