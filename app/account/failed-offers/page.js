import { UrlPropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { FailedOffers } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Failed/Declined Offers',
      },
    },
  });
}

export default function Page() {
  return <FailedOffers />;
}

Page.propTypes = UrlPropTypes;
