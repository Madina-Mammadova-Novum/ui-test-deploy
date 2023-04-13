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
    <AccountWrapper containerClass="grow px-5">
      <Negotiating />
    </AccountWrapper>
  );
};

export default PreFixturePage;
