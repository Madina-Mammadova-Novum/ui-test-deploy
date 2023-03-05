import PropTypes from 'prop-types';

import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const AuthWrapper = ({ title, subtitle, children }) => {
  return (
    <>
      <h2>{title}</h2>
      <p className="mt-5 text-xsm text-black max-w-[296px]">{subtitle}</p>
      {children}
      <NextLink href={ROUTES.LOGIN} customStyles="w-full mt-2.5">
        Return to Log in
      </NextLink>
    </>
  );
};

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthWrapper;
