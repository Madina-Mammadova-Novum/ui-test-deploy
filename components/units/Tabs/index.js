import classnames from 'classnames';
import PropTypes from 'prop-types';

const Tabs = ({ tabs, customStyles, activeTab, onClick }) => {
  return (
    <div className={classnames('flex p-1 bg-purple-light w-min rounded-md text-xsm font-medium', customStyles)}>
      {tabs.map(({ value, label }) => (
        <button
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

Tabs.defaultProps = {
  customStyles: '',
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customStyles: PropTypes.string,
};

export default Tabs;
