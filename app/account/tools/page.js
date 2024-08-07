import { metaData } from '@/adapters/metaData';
import { AccountTools } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Tools',
      },
    },
  });
}

export default function AccountTool() {
  return (
    <section className="mx-5">
      <AccountTools title="Tools" customHeight="h-[580px]" />
    </section>
  );
}
