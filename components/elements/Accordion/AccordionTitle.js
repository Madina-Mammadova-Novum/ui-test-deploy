import PropTypes from 'prop-types';

import ArrowSVG from '@/assets/images/arrow.svg';

const AccordionTitle = ({ title, icon, isOpened, isActive, hasNestedLinks }) => {
  return (
    <div
      className={`flex text-sm text-white font-semibold capitalize gap-3.5 w-full px-5 py-3 rounded-xl
        ${isActive ? 'bg-blue' : 'hover:bg-blue-dark'} 
        ${isOpened && hasNestedLinks && 'bg-blue-dark'}`}
    >
      {icon}
      {!hasNestedLinks ? (
        <p className="text-white">{title}</p>
      ) : (
        <p className="flex w-full justify-between items-center">
          <span className="text-white">{title}</span>
          <ArrowSVG className={`fill-white w-3 h-3 transition duration-200 ${isOpened && 'rotate-180'}`} />
        </p>
      )}
    </div>
  );
};

AccordionTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  isOpened: PropTypes.bool,
  isActive: PropTypes.bool,
  hasNestedLinks: PropTypes.bool,
};

export default AccordionTitle;
