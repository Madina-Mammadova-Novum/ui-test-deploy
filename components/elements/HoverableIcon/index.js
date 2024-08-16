import { HoverableIconPropTypes } from '@/lib/types';

const HoverableIcon = ({ icon, className = '' }) => {
  return <div className={`${className} cursor-pointer rounded-md p-1 hover:bg-purple-light`}>{icon}</div>;
};

HoverableIcon.propTypes = HoverableIconPropTypes;

export default HoverableIcon;
