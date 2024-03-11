import { metaData } from '@/adapters/metaData';
import { Negotiating } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Negotiating',
      },
    },
  });
}

export default function Page() {
  return <Negotiating />;
}
