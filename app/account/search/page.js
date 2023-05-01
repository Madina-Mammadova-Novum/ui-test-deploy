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
  // todo: temporarily until authorization functionality is completed
  const isUserAuthorized = true;

  return (
    <AccountWrapper containerClass="grow px-5">
      <TankerSearch title="Search" isUserAuthorized={isUserAuthorized} />
    </AccountWrapper>
  );
};

export default VesselsSearch;
