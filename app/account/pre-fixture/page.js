import { metaData } from '@/adapters/metaData';
import { PreFixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Pre Fixture',
      },
    },
  });
}

export default function Page() {
  return <PreFixture />;
}
