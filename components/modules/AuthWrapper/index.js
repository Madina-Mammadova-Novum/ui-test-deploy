import { AuthWrapperPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const AuthWrapper = ({ title, subtitle, children, containerClass = '' }) => {
  return (
    <div className={`w-form pt-2.5 px-10 ${containerClass}`}>
      <Title level="2">{title}</Title>
      {subtitle && <p className="pt-5 text-xsm text-black max-w-[296px]">{subtitle}</p>}
      {children}
    </div>
  );
};

AuthWrapper.propTypes = AuthWrapperPropTypes;

export default AuthWrapper;
