import Link from 'next/link';
import PropTypes from 'prop-types';

const NextLink = ({ children, href }) => {
  return <Link href={href}>{children}</Link>;
};

NextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default NextLink;
