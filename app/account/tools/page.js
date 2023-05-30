import { metaData } from '@/adapters/metaData';
import { AccountTools, AccountWrapper } from '@/modules';

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
  return (
    <AccountWrapper containerClass="px-5">
      <AccountTools title="Tools" />
    </AccountWrapper>
  );
}
