import { NotificationSearchPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import { Input } from '@/elements';

const NotificationSearch = ({ value, onChange, containerClass, ...rest }) => {
  return (
    <div className={containerClass}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search through notifications"
        icon={<SearchSVG className="fill-gray" />}
        {...rest}
      />
    </div>
  );
};

NotificationSearch.propTypes = NotificationSearchPropTypes;

export default NotificationSearch;
