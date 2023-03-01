import PropTypes from 'prop-types';

const HoverableIcon = ({ icon }) => {
  return <div className="p-0.5 hover:bg-purple-light cursor-pointer rounded-md">{icon}</div>;
};

HoverableIcon.propTypes = {
  icon: PropTypes.node.isRequired,
};

export default HoverableIcon;
