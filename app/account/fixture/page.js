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
    <section className="grow px-5">
      <AccountWrapper title="Fixture" suptitle="Offer stage #4" containerClass="w-full">
        <Fixture />
      </AccountWrapper>
    </section>
  );
};

export default FixturePage;
