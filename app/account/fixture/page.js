import { metaData } from '@/adapters/metaData';
import { AccountWrapper, Fixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Fixture',
      },
    },
  });
}

const FixturePage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <Fixture />
    </AccountWrapper>
  );
};

export default FixturePage;
