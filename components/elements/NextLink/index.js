'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { NextLinkPropTypes } from '@/lib/types';

const NextLink = ({ children, href, className = '', target = null, ...rest }) => {
  const router = useRouter();

  const handleMouseEnter = () => router.prefetch(href);

  return (
    <Link href={href} onMouseEnter={handleMouseEnter} className={className} target={target} {...rest}>
      {children}
    </Link>
  );
};

NextLink.propTypes = NextLinkPropTypes;

export default NextLink;
