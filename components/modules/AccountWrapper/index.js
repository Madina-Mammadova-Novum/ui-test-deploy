import { AccountWrapperPropTypes } from '@/lib/types';

const AccountWrapper = ({ children, className }) => {
  return <div className={`flex flex-col gap-y-2.5 grow ${className}`}>{children}</div>;
};

AccountWrapper.propTypes = AccountWrapperPropTypes;

export default AccountWrapper;
