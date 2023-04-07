import classnames from 'classnames';
import PropTypes from 'prop-types';

import { NextLink } from '@/elements';

const TabsAsLinks = ({ tabs, customStyles, activeTab }) => {
  return (
    <div className={classnames('flex p-1 bg-purple-light w-min rounded-md text-xsm font-medium', customStyles)}>
      {tabs.map(({ value, label, path }) => (
        <NextLink
          value={value}
          className={classnames(
            'whitespace-nowrap min-w-16 w-full h-7 px-5 rounded-md flex items-center',
            value === activeTab && 'bg-white text-blue shadow-2xmd'
          )}
          href={path}
        >
          {label}
        </NextLink>
      ))}
    </div>
  );
};

TabsAsLinks.defaultProps = {
  customStyles: '',
};

TabsAsLinks.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
};

export default TabsAsLinks;
