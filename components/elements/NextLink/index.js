import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NextLink = ({ children, href, type, customStyles }) => {
  return (
    <Link
      href={href}
      className={classnames(customStyles, {
        'text-[12px] border-b border-black': type === 'default',
      })}
    >
      {children}
    </Link>
  );
};

NextLink.defaultProps = {
  customStyles: '',
  type: 'default',
};

NextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  type: PropTypes.string,
};

export default NextLink;
