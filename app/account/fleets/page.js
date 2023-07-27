import { metaData } from '@/adapters/metaData';
import { AccountWrapper, Fleets } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Tanker list',
      },
    },
  });
}

const FleetsPage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <Fleets />
    </AccountWrapper>
  );
};

export default FleetsPage;
