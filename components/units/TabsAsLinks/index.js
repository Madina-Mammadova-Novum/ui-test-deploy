import classNames from 'classnames';

import { TabAsLinkPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';
import { makeId } from '@/utils/helpers';

const TabsAsLinks = ({ tabs, customStyles = '', activeTab }) => {
  return (
    <div className={classNames('flex w-min rounded-md bg-purple-light p-1 text-xsm font-medium', customStyles)}>
      {tabs.map(({ value, label, path }) => (
        <NextLink
          key={makeId()}
          value={value}
          className={classNames(
            'flex h-7 w-full min-w-16 items-center whitespace-nowrap rounded-md px-5',
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
