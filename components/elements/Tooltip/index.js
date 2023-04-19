'use client';

import { useMemo, useState } from 'react';

import { TooltipPropTypes } from '@/lib/types';

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

Tooltip.propTypes = TooltipPropTypes;

export default Tooltip;
