import { metaData } from '@/adapters/metaData';
import { AccountWrapper, OnSubs } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'On-Subs',
      },
    },
  });
}

const NegotiatingPage = () => {
  return (
    <AccountWrapper containerClass="px-5">
      <OnSubs />
    </AccountWrapper>
  );
};

export default NegotiatingPage;
