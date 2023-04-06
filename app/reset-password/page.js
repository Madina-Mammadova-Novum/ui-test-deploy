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
      containerClass="w-3/4"
    >
      <ResetPasswordForm />
      <NextLink href={ROUTES.LOGIN} className="inline-flex w-full justify-center text-blue text-xsm pt-2.5 w-[calc(100%-183px)] md:w-[calc(100%-203px)]">
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
