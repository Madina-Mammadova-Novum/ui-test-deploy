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
    <section className="md:min-h-[calc(100vh-160px) min-h-[calc(100vh-200px)] w-full max-w-[155.75rem] px-5">
      <AccountTools title="Tools" customHeight="h-[580px]" isLoggedIn />
    </section>
  );
}
