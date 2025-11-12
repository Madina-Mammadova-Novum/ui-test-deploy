'use client';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, HoverTooltip } from '@/elements';

const IconButtonWithTooltip = ({
  icon,
  tooltipText,
  onClick,
  disabled = false,
  className = '',
  loading = false,
  tooltipClassName = '',
}) => {
  return (
    <HoverTooltip
      className={classNames(
        '!left-1/2 !top-10 !-translate-x-1/2 2md:!left-auto 2md:!right-0 2md:!translate-x-0',
        tooltipClassName
      )}
      data={{ description: tooltipText }}
      disabled={disabled}
    >
      <Button
        buttonProps={{
          icon: { before: icon },
          variant: 'primary',
          size: 'small',
        }}
        customStyles={classNames(
          'border border-blue hover:border-blue-darker !p-2 !min-w-0',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={onClick}
        disabled={disabled || loading}
      />
    </HoverTooltip>
  );
};

IconButtonWithTooltip.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  tooltipClassName: PropTypes.string,
};

export default IconButtonWithTooltip;
