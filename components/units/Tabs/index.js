import classnames from 'classnames';

import { TabsPropTypes } from '@/lib/types';

const Tabs = ({ tabs, customStyles = '', activeTab, onClick, ...rest }) => {
  return (
    <div className={classnames('flex w-min rounded-md bg-purple-light p-1 text-xsm font-medium', customStyles)}>
      {tabs?.map(({ value, label }) => (
        <button
          {...rest}
          key={value}
          type="button"
          value={value}
          onClick={onClick}
          className={classnames(
            'h-7 min-w-16 whitespace-nowrap rounded-md px-5',
            value === activeTab && 'bg-white text-blue shadow-2xmd'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = TabsPropTypes;

export default Tabs;
