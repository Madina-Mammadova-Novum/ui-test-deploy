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
    <AccountWrapper title="Account information" containerClass="grow px-5">
      <AccountDetails containerClass="flex justify-start items-start flex-col gap-2.5" />
    </AccountWrapper>
  );
}
