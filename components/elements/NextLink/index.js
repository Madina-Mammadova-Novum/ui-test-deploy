import Link from 'next/link';

import { NextLinkPropTypes } from '@/lib/types';

const NextLink = ({ children, href, className = '', target = null, ...rest }) => {
  return (
    <Link href={href} prefetch className={className} target={target} {...rest}>
      {children}
    </Link>
  );
};

NextLink.propTypes = NextLinkPropTypes;

export default NextLink;
