import { metaData } from '@/adapters/metaData';
import { AccountDetails, AccountWrapper } from '@/modules';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Information',
      },
    },
  });
}

export default async function AccountInformation() {
  return (
    <section className="grow px-5">
      <AccountWrapper title="Account information" containerClass="w-full">
        <AccountDetails containerClass="flex justify-start items-start flex-col gap-2.5" />
      </AccountWrapper>
    </section>
  );
}
