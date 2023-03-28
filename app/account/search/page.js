import { metaData } from '@/adapters/metaData';
import { AccountWrapper, TankerSearch } from '@/modules';

export async function generateMetadata() {
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
    <section className="grow px-5">
      <AccountWrapper title="Search" containerClass="w-full">
        <TankerSearch />
      </AccountWrapper>
    </section>
  );
};

export default VesselsSearch;
