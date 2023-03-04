import PropTypes from 'prop-types';

import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { ForgotPasswordForm } from '@/units';

const ForgotPassword = ({ title, subtitle }) => {
  return (
    <>
      <h2>{title}</h2>
      <p className="mt-5 text-xsm text-black">{subtitle}</p>
      <ForgotPasswordForm />
      <NextLink href={ROUTES.LOGIN} customStyles="w-full mt-2.5">
        Return to Log in
      </NextLink>
    </>
  );
};

ForgotPassword.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ForgotPassword;
