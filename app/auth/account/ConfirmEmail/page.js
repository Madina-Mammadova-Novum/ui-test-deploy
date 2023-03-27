import { metaData } from '@/adapters/metaData';
import { AuthWrapper } from '@/modules';
import { VerifficationUserAccount } from '@/units';

export async function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Confirm Email',
      },
    },
  });
}

const ConfirmEmailPage = () => {
  return (
    <AuthWrapper title="Verifficate your account" containerClass="w-full text-center h-[90vh]">
      <VerifficationUserAccount />
    </AuthWrapper>
  );
};

export default ConfirmEmailPage;
