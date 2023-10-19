import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { PostFixtureDetails } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Post-Fixture Details',
      },
    },
  });
}

export default function Page({ params, searchParams }) {
  const searchedParams = searchParamsAdapter({ data: { id: params.id, ...searchParams } });

  return <PostFixtureDetails searchedParams={searchedParams} />;
}

Page.propTypes = UrlPropTypes;
