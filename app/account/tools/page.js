import { metaData } from '@/adapters/metaData';
import { AccountTools } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Tools',
      },
    },
  });
}

export default function AccountTool() {
  return <AccountTools title="Tools" />;
}
