import { UrlPropTypes } from '@/lib/types';

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

const NegotiatingPage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <Negotiating />
    </AccountWrapper>
  );
};

NegotiatingPage.propTypes = UrlPropTypes;

export default NegotiatingPage;
