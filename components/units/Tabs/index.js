import classNames from 'classnames';

import { TabsPropTypes } from '@/lib/types';

import { Badge } from '@/elements';

const Tabs = ({ tabs, customStyles = '', hasUnreadComment = false, activeTab, onClick, disabled = false, ...rest }) => {
  return (
    <div className={classNames('flex w-min rounded-md bg-purple-light p-1 text-xsm font-medium', customStyles)}>
      {tabs?.map(({ value, label }) => (
        <div key={value} className="relative flex items-center">
          {hasUnreadComment && value === 'comments' && <Badge counter="1" className="left-1" />}

          <button
            {...rest}
            type="button"
            value={value}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={classNames(
              'h-7 min-w-16 whitespace-nowrap rounded-md px-5',
              value === activeTab && 'bg-white text-blue shadow-2xmd',
              hasUnreadComment && 'px-7',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = TabsPropTypes;

export default Tabs;
