import { metaData } from '@/adapters/metaData';
import { AccountDetails, AccountWrapper } from '@/modules';
import { getUserDetails } from '@/services';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Information',
      },
    },
  });
}

const AccountInformation = async () => {
  const data = await getUserDetails();

  return (
    <section className="grow px-5">
      <AccountWrapper title="Account information" containerClass="w-full">
        <AccountDetails data={data} containerClass="flex justify-start items-start flex-col gap-2.5" />
      </AccountWrapper>
    </section>
  );
};

export default AccountInformation;
