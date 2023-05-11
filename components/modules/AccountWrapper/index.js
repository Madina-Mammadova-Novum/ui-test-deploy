import { AccountWrapperPropTypes } from '@/lib/types';

const AccountWrapper = ({ children, containerClass = 'w-full' }) => {
  return <div className={containerClass}>{children}</div>;
};

AccountWrapper.propTypes = AccountWrapperPropTypes;

export default AccountWrapper;
