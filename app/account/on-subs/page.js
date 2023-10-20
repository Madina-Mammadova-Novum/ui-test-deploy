import { metaData } from '@/adapters/metaData';
import { OnSubs } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'On-Subs',
      },
    },
  });
}

export default function Page() {
  return <OnSubs />;
}
