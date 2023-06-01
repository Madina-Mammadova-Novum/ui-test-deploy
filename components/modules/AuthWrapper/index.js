import { AuthWrapperPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const AuthWrapper = ({ title, subtitle, children, containerClass = '' }) => {
  return (
    <div className={`pt-5 ml-auto mr-auto 3md:ml-0 3md:mr-24 col-start-1 3md:col-start-2 ${containerClass}`}>
      <Title level="2">{title}</Title>
      {subtitle && <p className="pt-5 text-xsm text-black max-w-[296px]">{subtitle}</p>}
      {children}
    </div>
  );
};

AuthWrapper.propTypes = AuthWrapperPropTypes;

export default AuthWrapper;
