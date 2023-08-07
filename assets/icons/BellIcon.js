import { BellIconPropTypes } from '@/lib/types';

import BellSVG from '@/assets/images/bell.svg';
import { HoverableIcon } from '@/elements';

const BellIcon = ({ counter }) => {
  return (
    <div>
      <HoverableIcon icon={<BellSVG />} />
      {counter !== 0 && (
        <div className="absolute border border-white border-solid -top-1 -right-2 px-0.5 h-5 min-w-4 rounded-base bg-blue text-xxs font-bold text-white flex items-center justify-center">
          {counter}
        </div>
      )}
    </div>
  );
};

BellIcon.propTypes = BellIconPropTypes;

export default BellIcon;
