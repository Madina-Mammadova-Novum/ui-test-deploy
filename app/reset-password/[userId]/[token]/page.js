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
      containerClass="md:px-28 -translate-y-14 min-w-[450px]"
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
