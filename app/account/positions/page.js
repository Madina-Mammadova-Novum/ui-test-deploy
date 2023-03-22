import { metaData } from '@/adapters/metaData';
import { AccountWrapper } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Positions',
      },
    },
  });
}

const AccountPostions = () => {
  return (
    <AccountWrapper title="My positions" containerClass="w-full h-full px-5">
      <div>positions</div>
    </AccountWrapper>
  );
};

export default AccountPostions;
