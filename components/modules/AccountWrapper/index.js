import PropTypes from 'prop-types';

const AccountWrapper = ({ children, containerClass }) => {
  return <div className={containerClass}>{children}</div>;
};

AccountWrapper.defaultProps = {
  containerClass: 'w-full',
};

AccountWrapper.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountWrapper;
