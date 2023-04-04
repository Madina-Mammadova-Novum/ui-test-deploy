import { metaData } from '@/adapters/metaData';
import { AccountPositions, AccountWrapper } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Positions',
      },
    },
  });
}

export default async function AccountPostions() {
  return (
    <AccountWrapper title="My positions" containerClass="grow px-5">
      <AccountPositions containerClass="flex flex-col gap-2" />
    </AccountWrapper>
  );
}
