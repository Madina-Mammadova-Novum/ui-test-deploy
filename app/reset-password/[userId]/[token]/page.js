import { ResetPasswordPagePropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { AuthHeader, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { NewAuthWrapper, ResetPasswordForm } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.RESET_PASSWORD,
      seo: {
        metaTitle: 'Reset Password',
      },
    },
  });
}

const ResetPasswordPage = ({ params }) => {
  return (
    <NewAuthWrapper containerClass="flex flex-col w-full px-4 md:px-8 3md:mx-auto 3md:max-w-[546px] xl:px-0 gap-8 3md:gap-12">
      <AuthHeader
        logoSrc="/images/dark-logo.png"
        titleText="Reset your password"
        accountText="Pick and set a new password for your account and you're good to go!"
      />

      <div className="flex flex-col items-center justify-center gap-y-4">
        <ResetPasswordForm params={params} />
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

ResetPasswordPage.propTypes = ResetPasswordPagePropTypes;

export default ResetPasswordPage;
