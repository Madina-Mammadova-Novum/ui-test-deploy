import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, ResetPasswordForm } from '@/modules';

export function generateMetadata() {
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
      containerClass="w-3/4 -translate-y-14 min-w-[450px]"
    >
      <ResetPasswordForm />
      <NextLink
        href={ROUTES.LOGIN}
        className="inline-flex justify-center items-center w-full pt-2.5 text-blue text-xsm"
      >
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
