import { metaData } from '@/adapters/metaData';
import { AccountDetails } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Information',
      },
    },
  });
}

export default function AccountInformation() {
  return <AccountDetails />;
}
