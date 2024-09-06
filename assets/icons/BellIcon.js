import { BellIconPropTypes } from '@/lib/types';

import BellSVG from '@/assets/images/bell.svg';
import { Badge, HoverableIcon } from '@/elements';

const BellIcon = ({ counter }) => {
  return (
    <div>
      <HoverableIcon icon={<BellSVG className="fill-black" />} />
      <Badge counter={counter} className="-right-1 -top-1 p-2.5" />
    </div>
  );
};

BellIcon.propTypes = BellIconPropTypes;

export default BellIcon;
