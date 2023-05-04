import { metaData } from '@/adapters/metaData';
import { AccountWrapper, TankerSearch } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Search',
      },
    },
  });
}

const VesselsSearch = () => {

  return (
    <AccountWrapper containerClass="grow px-5">
      <TankerSearch title="Search" />
    </AccountWrapper>
  );
};

export default VesselsSearch;
