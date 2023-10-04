import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountWrapper, Negotiating } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Negotiating',
      },
    },
  });
}

const NegotiatingPage = ({ searchParams }) => {
  const urlParams = searchParamsAdapter({ data: searchParams });

  return (
    <AccountWrapper containerClass="px-5">
      <Negotiating searachParams={urlParams} />
    </AccountWrapper>
  );
};

NegotiatingPage.propTypes = UrlPropTypes;

export default NegotiatingPage;
