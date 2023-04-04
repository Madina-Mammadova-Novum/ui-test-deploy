import PropTypes from 'prop-types';

const FieldsetContentWrapper = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

FieldsetContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FieldsetContentWrapper;
