'use client';

import { useMemo, useState } from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import HoverTooltip from '@/elements/Tooltip/HoverTooltip';
import ManualTooltip from '@/elements/Tooltip/ManualTooltip';

const Tooltip = ({ variant, tooltipText, data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const paresedContent = useMemo(() => {
    return (data?.content !== undefined || data?.content !== '') && parse(data?.content);
  }, [data?.content]);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  const printTooltip = useMemo(() => {
    switch (variant) {
      case 'manual':
        return (
          <ManualTooltip
            tooltipText={tooltipText}
            onEnter={handleEnter}
            onClose={handleClose}
            inView={showTooltip}
            title={data?.title}
            description={paresedContent}
          />
        );
      default:
        return (
          <HoverTooltip
            tooltipText={tooltipText}
            onEnter={handleEnter}
            onClose={handleClose}
            inView={showTooltip}
            description={paresedContent}
          />
        );
    }
  }, [data?.title, paresedContent, showTooltip, tooltipText, variant]);

  return printTooltip;
};

Tooltip.propTypes = {
  variant: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.element,
  }).isRequired,
};

export default Tooltip;
