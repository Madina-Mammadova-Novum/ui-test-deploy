import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, ResetPasswordForm } from '@/modules';

export async function generateMetadata({ params }) {
  // eslint-disable-next-line no-console
  console.log({ params });
  return metaData({
    data: {
      seo: {
        metaTitle: 'Reset Password',
      },
    },
  });
}

const ResetPasswordPage = () => {
  return (
    <AuthWrapper
      title="Reset your password"
      subtitle="Pick and set a new password for your account and you’re good to go!"
      containerClass="w-3/4"
    >
      <ResetPasswordForm />
      <NextLink href={ROUTES.LOGIN} className="inline-flex w-full justify-center text-blue text-xsm pt-2.5">
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
