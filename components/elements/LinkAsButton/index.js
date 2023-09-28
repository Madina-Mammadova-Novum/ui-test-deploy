'use client';

import classnames from 'classnames';
import { useRouter } from 'next/navigation';

import { LinkAsButtonPropTypes } from '@/lib/types';

import { getButtonClassNames } from '@/utils/helpers';

const LinkAsButton = ({
  buttonProps: { variant, size },
  children,
  href,
  customStyles,
  disabled = false,
  target = null,
  ...rest
}) => {
  const router = useRouter();
  const buttonClassNames = getButtonClassNames(variant, size);

  return (
    <span
      aria-hidden
      onClick={() => router.push(href)}
      className={classnames(
        'text-xsm flex items-center justify-center whitespace-nowrap',
        buttonClassNames,
        disabled && 'opacity-50 pointer-events-none',
        customStyles
      )}
      target={target}
      {...rest}
    >
      {children}
    </span>
  );
};

LinkAsButton.propTypes = LinkAsButtonPropTypes;

export default LinkAsButton;
