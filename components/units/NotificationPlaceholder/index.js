import { NotificationPlaceholderPropTypes } from '@/lib/types';

import ShipSVG from '@/assets/images/ship.svg';

const NotificationPlaceholder = ({ containerClass, text }) => {
  return (
    <figure
      className={`${containerClass} bg-gray-light flex h-28 z-0 overflow-visible items-center justify-center gap-x-2.5 rounded-base`}
    >
      <ShipSVG />
      <figcaption className="text-gray text-xsm font-semibold">{text}</figcaption>
    </figure>
  );
};

NotificationPlaceholder.propTypes = NotificationPlaceholderPropTypes;

export default NotificationPlaceholder;
