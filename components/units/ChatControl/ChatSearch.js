import { ChatSearchPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import { Input } from '@/elements';
import { getRoleIdentity } from '@/utils/helpers';

const ChatSearch = ({ value, onChange, role, containerClass, ...rest }) => {
  const { isOwner } = getRoleIdentity({ role });

  const printPlaceholer = isOwner ? 'Search by Vessel, IMO, product type' : 'Search by Cargoe ID, product, category';

  return (
    <div className={containerClass}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={printPlaceholer}
        icon={<SearchSVG className="fill-gray" />}
        customStyles="bg-gray-light border-gray"
        inputStyles="!pl-4 !pr-1 placeholder:text-xs-sm"
        {...rest}
      />
    </div>
  );
};

ChatSearch.propTypes = ChatSearchPropTypes;

export default ChatSearch;
