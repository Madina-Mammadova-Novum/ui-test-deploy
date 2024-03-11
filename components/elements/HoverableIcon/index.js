import { HoverableIconPropTypes } from '@/lib/types';

const HoverableIcon = ({ icon, className = '' }) => {
  return <div className={`${className} p-1 hover:bg-purple-light cursor-pointer rounded-md`}>{icon}</div>;
};

HoverableIcon.propTypes = HoverableIconPropTypes;

export default HoverableIcon;
