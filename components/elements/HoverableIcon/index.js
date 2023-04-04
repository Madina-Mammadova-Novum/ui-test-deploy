import PropTypes from 'prop-types';

const HoverableIcon = ({ icon, className }) => {
  return <div className={`${className} p-1 hover:bg-purple-light cursor-pointer`}>{icon}</div>;
};

HoverableIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default HoverableIcon;
