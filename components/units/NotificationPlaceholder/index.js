import { NotificationPlaceholderPropTypes } from '@/lib/types';

import ShipSVG from '@/assets/images/ship.svg';

const NotificationPlaceholder = ({ containerClass, text }) => {
  return (
    <figure
      className={`${containerClass} z-0 flex h-28 items-center justify-center gap-x-2.5 overflow-visible rounded-base bg-gray-light`}
    >
      <ShipSVG />
      <figcaption className="text-xsm font-semibold text-gray">{text}</figcaption>
    </figure>
  );
};

NotificationPlaceholder.propTypes = NotificationPlaceholderPropTypes;

export default NotificationPlaceholder;
