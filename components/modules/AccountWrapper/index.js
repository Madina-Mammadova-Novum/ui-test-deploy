import { AccountWrapperPropTypes } from '@/lib/types';

const AccountWrapper = ({ children, className }) => {
  return <div className={`flex grow flex-col gap-y-2.5 ${className}`}>{children}</div>;
};

AccountWrapper.propTypes = AccountWrapperPropTypes;

export default AccountWrapper;
