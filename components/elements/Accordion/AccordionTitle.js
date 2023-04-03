import PropTypes from 'prop-types';

const AccordionTitle = ({ title, icon, isOpened, isActive, hasNestedLinks }) => {
  return (
    <span
      className={`flex text-sm font-semibold capitalize gap-3.5 w-full px-5 py-3 rounded-xl
        ${isActive ? 'bg-blue' : 'hover:bg-blue-dark'} 
        ${isOpened && hasNestedLinks && 'bg-blue-dark'}`}
    >
      {icon}
      {title}
    </span>
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
