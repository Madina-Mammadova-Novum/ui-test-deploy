import { ShipIconPropTypes } from '@/lib/types';

import ShipSVG from '@/assets/images/shipChat.svg';

const ShipIcon = ({ isOnline }) => {
  return (
    <div className="bg-gray-light border h-10 w-10 rounded-full relative border-gray-darker">
      <ShipSVG className="fill-black absolute left-2 top-2.5" />
      {isOnline && <div className="border border-white rounded-full absolute bottom-0 right-0 bg-green p-1" />}
    </div>
  );
};

ShipIcon.propTypes = ShipIconPropTypes;

export default ShipIcon;
