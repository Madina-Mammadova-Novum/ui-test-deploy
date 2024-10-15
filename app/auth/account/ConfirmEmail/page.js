import { metaData } from '@/adapters/metaData';
import { AuthWrapper } from '@/modules';
import { VerificationUserAccount } from '@/units';

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
    <AuthWrapper
      title="Verify your account"
      containerClass="flex flex-col gap-y-5 items-center w-1/2 3md:w-1/3 3md:mx-32 lg:mx-40"
    >
      <VerificationUserAccount />
    </AuthWrapper>
  );
}
