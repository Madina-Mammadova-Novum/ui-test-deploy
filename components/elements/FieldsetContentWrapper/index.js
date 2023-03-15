import PropTypes from 'prop-types';

const FieldsetContentWrapper = ({ children }) => {
  return <div className="grid grid-cols-1 3sm:grid-cols-2">{children}</div>;
};

FieldsetContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FieldsetContentWrapper;
