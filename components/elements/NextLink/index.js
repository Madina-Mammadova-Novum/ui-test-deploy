import Link from 'next/link';
import PropTypes from 'prop-types';

const NextLink = ({ children, href, className }) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

NextLink.defaultProps = {
  className: '',
};

NextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NextLink;
