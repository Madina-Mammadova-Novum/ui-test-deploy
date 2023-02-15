import classnames from 'classnames';
import PropTypes from 'prop-types';

const Badge = ({ children, customStyles }) => (
  <span className={classnames('px-1.5 py-1 bg-yellow rounded-md uppercase text-[12px] font-bold ml-5', customStyles)}>
    {children}
  </span>
);

Badge.defaultProps = {
  customStyles: '',
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  customStyles: PropTypes.string,
};

export default Badge;
