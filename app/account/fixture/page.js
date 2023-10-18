import { metaData } from '@/adapters/metaData';
import { Fixture } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Fixture',
      },
    },
  });
}
export default function Page() {
  return <Fixture />;
}
