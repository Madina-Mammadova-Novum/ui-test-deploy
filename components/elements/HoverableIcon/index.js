import PropTypes from 'prop-types';

const HoverableIcon = ({ icon, customStyles }) => {
  return <div className={`p-0.5 hover:bg-purple-light cursor-pointer rounded-md ${customStyles}`}>{icon}</div>;
};

HoverableIcon.defaultProps = {
  customStyles: '',
};

HoverableIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  customStyles: PropTypes.string,
};

export default HoverableIcon;
