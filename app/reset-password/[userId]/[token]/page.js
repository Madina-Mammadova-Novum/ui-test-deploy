import { ResetPasswordPagePropTypes } from '@/lib/types';

import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, ResetPasswordForm } from '@/modules';

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
    <AuthWrapper
      title="Reset your password"
      subtitle="Pick and set a new password for your account and you’re good to go!"
      containerClass="flex flex-col w-full sm:w-1/2 3md:w-1/3 3md:mx-32 lg:mx-40"
    >
      <ResetPasswordForm params={params} />
      <NextLink
        href={ROUTES.LOGIN}
        className="inline-flex w-full items-center justify-center pt-2.5 text-xsm text-blue"
      >
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

ResetPasswordPage.propTypes = ResetPasswordPagePropTypes;

export default ResetPasswordPage;
