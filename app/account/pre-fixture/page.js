import { metaData } from '@/adapters/metaData';
import { AccountWrapper, PreFixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Pre Fixture',
      },
    },
  });
}

const PreFixturePage = () => {
  return (
    <AccountWrapper containerClass="grow px-5">
      <PreFixture title="Pre-fixture" label="Offer stage #2" />
    </AccountWrapper>
  );
};

export default PreFixturePage;
