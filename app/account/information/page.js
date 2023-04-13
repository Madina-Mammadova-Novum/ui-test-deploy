import { metaData } from '@/adapters/metaData';
import { AccountDetails, AccountWrapper } from '@/modules';

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
  return (
    <AccountWrapper containerClass="px-5">
      <AccountDetails />
    </AccountWrapper>
  );
}
