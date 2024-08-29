import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, ForgotPasswordForm } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.FORGOT_PASSWORD,
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
      containerClass="flex flex-col w-full sm:w-1/2 3md:w-1/3 3md:mx-32 lg:mx-40"
    >
      <ForgotPasswordForm />
      <NextLink href={ROUTES.LOGIN} className="inline-flex w-full justify-center pt-2.5 text-xsm text-blue">
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
