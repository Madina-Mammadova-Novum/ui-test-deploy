import { metaData } from '@/adapters/metaData';
import { AccountPositions, AccountWrapper } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Positions',
      },
    },
  });
}

export default function AccountPostions() {
  return (
    <AccountWrapper containerClass="grow px-5">
      <AccountPositions title="My positions" containerClass="flex flex-col gap-y-5" />
    </AccountWrapper>
  );
}
