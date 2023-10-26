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
  return (
    <div className="px-5">
      <TankerSearch title="Search" />
    </div>
  );
};

export default VesselsSearch;
