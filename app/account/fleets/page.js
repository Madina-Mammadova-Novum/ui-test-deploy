import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountWrapper, Fleets } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Tanker list',
      },
    },
  });
}

const FleetsPage = ({ searchParams }) => {
  const urlParams = searchParamsAdapter({ data: searchParams });
  return (
    <AccountWrapper containerClass="px-5">
      <Fleets searchParams={urlParams} />
    </AccountWrapper>
  );
};

FleetsPage.propTypes = UrlPropTypes;

export default FleetsPage;
