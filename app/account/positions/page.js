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

export default function Page() {
  return <AccountPositions />;
}
