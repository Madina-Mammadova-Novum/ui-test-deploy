import { ShipIconPropTypes } from '@/lib/types';

import ShipSVG from '@/assets/images/shipChat.svg';

const ShipIcon = ({ isOnline }) => {
  return (
    <div className="relative h-10 w-10 rounded-full border border-gray-darker bg-gray-light">
      <ShipSVG className="absolute left-2 top-2.5 fill-black" />
      {isOnline && <div className="absolute bottom-0 right-0 rounded-full border border-white bg-green p-1" />}
    </div>
  );
};

ShipIcon.propTypes = ShipIconPropTypes;

export default ShipIcon;
