import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkTargetPropTypes } from '@/lib/types';

const LinkAsButton = ({ buttonProps, children, href, customStyles, disabled, target, ...rest }) => {
  const { variant, size } = buttonProps;
  return (
    <Link
      href={href}
      className={classnames(
        'text-xsm h-10 px-5 py-2.5 rounded-md flex items-center justify-center whitespace-nowrap',
        {
          'bg-blue text-white hover:bg-blue-darker ': variant === 'primary' && size === 'large',
          'bg-black text-white hover:bg-blue-dark': variant === 'secondary' && size === 'large',
          'bg-white text-black border border-grey hover:border-black': variant === 'tertiary' && size === 'large',
          'bg-white text-red border border-red-medium hover:border-red': variant === 'delete' && size === 'large',
          'bg-white px-2.5 py-1 text-blue border border-blue hover:border-blue-darker ':
            variant === 'primary' && size === 'medium',
          'bg-white px-2.5 py-1 text-black border border-grey hover:border-black ':
            variant === 'secondary' && size === 'medium',
          'bg-white px-2.5 py-1 text-red border border-red-medium hover:border-red ':
            variant === 'delete' && size === 'medium',
          'text-red': variant === 'delete' && size === 'small',
          'bg-white !p-0 text-blue hover:text-blue-darker': variant === 'primary' && size === 'small',
          'opacity-50 pointer-events-none': disabled,
        },
        customStyles
      )}
      target={target}
      {...rest}
    >
      {children}
    </Link>
  );
};

LinkAsButton.defaultProps = {
  target: null,
  disabled: false,
};

LinkAsButton.propTypes = {
  buttonProps: {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  }.isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
};

export default LinkAsButton;
