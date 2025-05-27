import GenericSuccessContent from './GenericSuccessContent';

import { metaData } from '@/adapters/metaData';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Success',
      },
    },
  });
}

const GenericSuccessPage = () => {
  return <GenericSuccessContent />;
};

export default GenericSuccessPage;
