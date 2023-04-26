'use client';

import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import HoverTooltip from '@/elements/Tooltip/HoverTooltip';
import ManualTooltip from '@/elements/Tooltip/ManualTooltip';

const Tooltip = ({ variant, className, children, data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  const printTooltip = useMemo(() => {
    switch (variant) {
      case 'manual':
        return (
          <ManualTooltip
            onEnter={handleEnter}
            onClose={handleClose}
            inView={showTooltip}
            className={className}
            title={data?.title}
            description={data?.description}
          >
            {children}
          </ManualTooltip>
        );
      default:
        return (
          <HoverTooltip
            className={className}
            onEnter={handleEnter}
            onClose={handleClose}
            inView={showTooltip}
            title={data?.title}
            description={data?.description}
          >
            {children}
          </HoverTooltip>
        );
    }
  }, [children, className, data?.description, data?.title, showTooltip, variant]);

  return printTooltip;
};

Tooltip.propTypes = {
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.element,
  }).isRequired,
};

export default Tooltip;
