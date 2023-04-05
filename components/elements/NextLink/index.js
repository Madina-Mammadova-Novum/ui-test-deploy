import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkTargetPropTypes } from '@/lib/types';

const NextLink = ({ children, href, className, target, ...rest }) => {
  return (
    <Link href={href} className={className} target={target} {...rest}>
      {children}
    </Link>
  );
};

NextLink.defaultProps = {
  className: '',
  target: null,
};

NextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: linkTargetPropTypes,
};

export default NextLink;
