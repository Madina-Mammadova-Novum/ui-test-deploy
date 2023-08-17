import { ChatSearchPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import { Input } from '@/elements';

const ChatSearch = ({ value, onChange, containerClass, ...rest }) => {
  return (
    <div className={containerClass}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by Vessel, IMO, product type"
        icon={<SearchSVG className="fill-gray" />}
        customStyles="bg-gray-light border-gray"
        {...rest}
      />
    </div>
  );
};

ChatSearch.propTypes = ChatSearchPropTypes;

export default ChatSearch;
