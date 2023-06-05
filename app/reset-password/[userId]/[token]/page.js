import { ResetPasswordPagePropTypes } from '@/lib/types';

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

const ResetPasswordPage = ({ params }) => {
  return (
    <AuthWrapper
      title="Reset your password"
      subtitle="Pick and set a new password for your account and you’re good to go!"
      containerClass="flex flex-col w-1/2 3md:w-1/3 3md:mx-32 lg:mx-40"
    >
      <ResetPasswordForm params={params} />
      <NextLink
        href={ROUTES.LOGIN}
        className="inline-flex justify-center items-center w-full pt-2.5 text-blue text-xsm"
      >
        Return to Log in
      </NextLink>
    </AuthWrapper>
  );
};

ResetPasswordPage.propTypes = ResetPasswordPagePropTypes;

export default ResetPasswordPage;
