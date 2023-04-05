'use client';

import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { AccordionBody } from '@/elements';
import { AccordionHeader } from '@/units';

const Accordion = ({ items, isFullWidth, open, onClick }) => {
  return (
    <div>
      {items.map(({ headerContent, bodyContent }) => (
        <div
          className={classnames(
            open && !isFullWidth ? 'relative border-none rounded-[10px] pt-[30px] bg-white shadow-xmd' : 'pt-[20px]',
            'text-black pb-2.5 peer:bg-blue-500'
          )}
        >
          <AccordionHeader isFullWidth={isFullWidth} isActive={open} onClick={onClick}>
            {headerContent}
          </AccordionHeader>

          <div className={classnames(open ? 'h-auto' : 'h-0', 'overflow-hidden transition-all duration-100')}>
            <AccordionBody>{bodyContent}</AccordionBody>
          </div>
        </div>
      ))}
    </div>
  );
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
};

export default Accordion;
