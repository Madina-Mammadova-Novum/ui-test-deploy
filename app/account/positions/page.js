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
      <AccountPositions />
    </AccountWrapper>
  );
}
