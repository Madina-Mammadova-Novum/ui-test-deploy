import { metaData } from '@/adapters/metaData';
import { TankerSearch } from '@/modules';

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
  return <TankerSearch isAccountSearch />;
};

export default VesselsSearch;
