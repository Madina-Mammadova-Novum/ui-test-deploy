'use client';

import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import HoverTooltip from '@/elements/Tooltip/HoverTooltip';
import ManualTooltip from '@/elements/Tooltip/ManualTooltip';

const Tooltip = ({ variant, children, data }) => {
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
            title={data?.title}
            description={data?.description}
          >
            {children}
          </ManualTooltip>
        );
      default:
        return (
          <HoverTooltip
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
  }, [children, data?.description, data?.title, showTooltip, variant]);

  return printTooltip;
};

Tooltip.propTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.element,
  }).isRequired,
};

export default Tooltip;
