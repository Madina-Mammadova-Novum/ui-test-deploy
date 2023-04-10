import { metaData } from '@/adapters/metaData';
import { AuthWrapper } from '@/modules';
import { VerifficationUserAccount } from '@/units';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Confirm Email',
      },
    },
  });
}

export default function ConfirmEmailPage() {
  return (
    <AuthWrapper title="Verifficate your account" containerClass="w-full text-center">
      <VerifficationUserAccount />
    </AuthWrapper>
  );
}
