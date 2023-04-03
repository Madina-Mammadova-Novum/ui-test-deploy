import { metaData } from '@/adapters/metaData';
import { AccountWrapper, Negotiating } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Negotiating',
      },
    },
  });
}

const PreFixturePage = () => {
  return (
    <section className="grow px-5">
      <AccountWrapper title="Negotiating" suptitle="Offer stage #1" containerClass="w-full">
        <Negotiating />
      </AccountWrapper>
    </section>
  );
};

export default PreFixturePage;
