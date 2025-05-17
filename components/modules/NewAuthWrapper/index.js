import { AuthWrapperPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const NewAuthWrapper = ({ title, subtitle, children, containerClass = '' }) => {
  return (
    <div className={`${containerClass}`}>
      {title && <Title level="2">{title}</Title>}
      {subtitle && <p className="max-w-[301px] pt-5 text-xsm text-black">{subtitle}</p>}
      {children}
    </div>
  );
};

NewAuthWrapper.propTypes = AuthWrapperPropTypes;

export default NewAuthWrapper;
