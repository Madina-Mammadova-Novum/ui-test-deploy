import { IconWrapperPropTypes } from '@/lib/types';

const IconWrapper = ({ iconData = {} }) => {
  const { className, icon } = iconData;

  return <span className={className}>{icon}</span>;
};

IconWrapper.propTypes = IconWrapperPropTypes;

export default IconWrapper;
