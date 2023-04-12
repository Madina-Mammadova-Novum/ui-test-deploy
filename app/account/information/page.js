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
    <AccountWrapper containerClass="grow px-5">
      <AccountDetails title="Account information" containerClass="flex justify-start items-start flex-col gap-2.5" />
    </AccountWrapper>
  );
}
