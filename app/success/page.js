import SuccessfulVerifPageContent from './SuccessfulVerifPageContent';

import { metaData } from '@/adapters/metaData';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Successful Verification',
      },
    },
  });
}

const SuccessfulVerifPage = () => {
  return <SuccessfulVerifPageContent />;
};

export default SuccessfulVerifPage;
