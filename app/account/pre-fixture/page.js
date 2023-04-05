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
    <section className="grow px-5">
      <AccountWrapper title="Pre-fixture" suptitle="Offer stage #2" containerClass="w-full">
        <PreFixture />
      </AccountWrapper>
    </section>
  );
};

export default PreFixturePage;
