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
    <AccountWrapper containerClass="grow px-5">
      <Fixture title="Fixture" label="Offer stage #4" />
    </AccountWrapper>
  );
};

export default FixturePage;
