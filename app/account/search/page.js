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
  return <TankerSearch title="Search" />;
};

export default VesselsSearch;
