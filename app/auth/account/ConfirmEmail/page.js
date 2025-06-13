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
    <AuthWrapper containerClass="flex flex-col items-center 3md:w-1/2 3md:mx-4 xl:mx-8">
      <VerificationUserAccount />
    </AuthWrapper>
  );
}
