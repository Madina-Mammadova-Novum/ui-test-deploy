import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, ForgotPasswordForm } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Forgot Password',
      },
    },
  });
}

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper
      title="Forgot your password?"
      subtitle="Enter your email address and you will receive an email with password reset link"
      containerClass="w-3/4"
    >
      <ForgotPasswordForm />
      <NextLink href={ROUTES.LOGIN} className="inline-flex w-full justify-center text-blue text-xsm pt-2.5">
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
