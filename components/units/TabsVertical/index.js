import classNames from 'classnames';

import { TabsPropTypes } from '@/lib/types';

const TabsVertical = ({ tabs, customStyles = '', activeTab, onClick }) => {
  const printTab = tabs.map(({ value, label }) => (
    <button
      type="button"
      key={value}
      value={value}
      onClick={onClick}
      className={classNames(
        'whitespace-nowrap border-l-2 border-transparent pl-2.5 text-sm font-semibold capitalize',
        value === activeTab && 'border-l-2 !border-blue text-blue'
      )}
    >
      {label}
    </button>
  ));
  return <div className={classNames('flex flex-col items-baseline gap-y-2.5', customStyles)}>{printTab}</div>;
};

TabsVertical.propTypes = TabsPropTypes;

export default TabsVertical;
