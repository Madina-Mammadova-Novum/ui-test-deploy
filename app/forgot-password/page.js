import { metaData } from '@/adapters/metaData';
import { AuthHeader, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { ForgotPasswordForm, NewAuthWrapper } from '@/modules';

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
    <NewAuthWrapper containerClass="flex flex-col w-full px-4 md:px-8 3md:mx-auto 3md:max-w-[546px] xl:px-0 gap-8 3md:gap-12">
      <AuthHeader
        logoSrc="/images/dark-logo.png"
        titleText="Forgot your password?"
        accountText="Enter your email address and you will receive an email the with password reset link"
      />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <ForgotPasswordForm />
        <p className="text-xsm text-black">
          Remember your password?{' '}
          <NextLink href={ROUTES.LOGIN} className="text-blue underline">
            Log In
          </NextLink>
        </p>
      </div>
    </NewAuthWrapper>
  );
};

export default ForgotPasswordPage;
