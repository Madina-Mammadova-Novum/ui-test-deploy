import PropTypes from 'prop-types';

import { Title } from '@/elements';

const AuthWrapper = ({ title, subtitle, children, containerClass }) => {
  return (
    <div className={`grid-start-1 3sm:col-start-2 m-auto ${containerClass}`}>
      <Title component="h2">{title}</Title>
      {subtitle ?? <p className="pt-5 text-xsm text-black max-w-[296px]">{subtitle}</p>}
      {children}
    </div>
  );
};

AuthWrapper.defaultProps = {
  containerClass: 'w-full',
  subtitle: null,
};

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  containerClass: PropTypes.string,
};

export default AuthWrapper;
