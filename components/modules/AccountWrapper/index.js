import PropTypes from 'prop-types';

const AccountWrapper = ({ children, containerClass }) => {
  return <main className={containerClass}>{children}</main>;
};

AccountWrapper.defaultProps = {
  containerClass: 'w-full',
};

AccountWrapper.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountWrapper;
