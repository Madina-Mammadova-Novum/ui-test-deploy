import PropTypes from 'prop-types';

const FieldsetWrapper = ({ children }) => {
  return <div className="bg-white rounded-base border-2 border-solid border-gray-darker p-5 w-full">{children}</div>;
};

FieldsetWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FieldsetWrapper;
