import { metaData } from '@/adapters/metaData';
import { AccountPositions, AccountWrapper } from '@/modules';
import { getUserPositions } from '@/services';

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
  const data = await getUserPositions();

  return (
    <AccountWrapper title="My positions" containerClass="w-full h-full px-5">
      <AccountPositions data={data} containerClass="flex flex-col gap-2" />
    </AccountWrapper>
  );
}
