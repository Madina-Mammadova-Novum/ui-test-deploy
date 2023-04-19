'use client';

import React, { useRef } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { AccordionBody } from '@/elements';
import { AccordionHeader } from '@/units';

const Accordion = ({ items, isFullWidth, open, onClick, icon }) => {
  const ref = useRef(null);

  return items.map(({ headerContent, bodyContent }) => (
    <div
      className={classnames(
        open && !isFullWidth && 'relative border-none rounded-[10px] bg-white shadow-xmd -mb-2',
        'text-black pb-2.5'
      )}
    >
      <AccordionHeader isFullWidth={isFullWidth} isActive={open} onClick={onClick} icon={icon}>
        {headerContent}
      </AccordionHeader>

      <div
        ref={ref}
        className="overflow-hidden transition-all"
        style={{ height: open ? `${ref?.current?.scrollHeight}px` : '0px' }}
      >
        <AccordionBody isFullWidth={isFullWidth}>{bodyContent}</AccordionBody>
      </div>
    </div>
  ));
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      headerContent: PropTypes.string,
      bodyContent: PropTypes.node,
    })
  ).isRequired,
  isFullWidth: PropTypes.bool,
  open: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};

export default Accordion;
