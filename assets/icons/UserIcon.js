import { UserIconPropTypes } from '@/lib/types';

import UserSVG from '@/assets/images/user.svg';

const UserIcon = ({ isOnline }) => {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-darker bg-gray-light">
      <UserSVG className="fill-black" />
      {isOnline && <div className="absolute bottom-0 right-0 rounded-full border border-white bg-green p-1" />}
    </div>
  );
};

UserIcon.propTypes = UserIconPropTypes;

export default UserIcon;
