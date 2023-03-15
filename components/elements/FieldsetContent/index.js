import PropTypes from 'prop-types';

const FieldsetContent = ({ label, children, className }) => {
  return (
    <div className={className}>
      {label ?? <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">{label}</p>}
      {children}
    </div>
  );
};

FieldsetContent.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FieldsetContent;
