import classnames from 'classnames';

import { TabsPropTypes } from '@/lib/types';

const TabsVertical = ({ tabs, customStyles = '', activeTab, onClick }) => {
  return (
    <div className={classnames('flex flex-col items-baseline gap-y-2.5', customStyles)}>
      {tabs.map(({ value, label }) => (
        <button
          type="button"
          value={value}
          onClick={onClick}
          className={classnames(
            'whitespace-nowrap font-semibold text-sm pl-2.5 border-l-2 border-transparent',
            value === activeTab && 'text-blue border-l-2 !border-blue'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

TabsVertical.propTypes = TabsPropTypes;

export default TabsVertical;
