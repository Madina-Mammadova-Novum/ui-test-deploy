import classnames from 'classnames';

import { TabsPropTypes } from '@/lib/types';

const Tabs = ({ tabs, customStyles = '', activeTab, onClick }) => {
  return (
    <div className={classnames('flex p-1 bg-purple-light w-min rounded-md text-xsm font-medium', customStyles)}>
      {tabs?.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          value={value}
          onClick={onClick}
          className={classnames(
            'whitespace-nowrap min-w-16 w-full h-7 px-5 rounded-md',
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
