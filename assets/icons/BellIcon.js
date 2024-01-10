import { BellIconPropTypes } from '@/lib/types';

import BellSVG from '@/assets/images/bell.svg';
import { Badge, HoverableIcon } from '@/elements';

const BellIcon = ({ counter }) => {
  return (
    <div>
      <HoverableIcon icon={<BellSVG />} />
      <Badge counter={counter} className="-top-1 -right-1 p-2.5" />
    </div>
  );
};

BellIcon.propTypes = BellIconPropTypes;

export default BellIcon;
