import classnames from 'classnames';

import { TabAsLinkPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';
import { makeId } from '@/utils/helpers';

const TabsAsLinks = ({ tabs, customStyles = '', activeTab }) => {
  return (
    <div className={classnames('flex p-1 bg-purple-light w-min rounded-md text-xsm font-medium', customStyles)}>
      {tabs.map(({ value, label, path }) => (
        <NextLink
          key={makeId()}
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

TabsAsLinks.propTypes = TabAsLinkPropTypes;

export default TabsAsLinks;
