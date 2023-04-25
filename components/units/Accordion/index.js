'use client';

import { useRef } from 'react';

import classnames from 'classnames';

import { AccordionPropTypes } from '@/lib/types';

import { AccordionBody } from '@/elements';
import { AccordionHeader } from '@/units';

const Accordion = ({ items, isFullWidth, open, onClick, icon }) => {
  const ref = useRef(null);

  return items.map(({ headerContent, bodyContent }) => (
    <div
      className={classnames(
        open && !isFullWidth && 'relative !border-transparent rounded-base bg-white shadow-xmd -mb-2',
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

Accordion.propTypes = AccordionPropTypes;

export default Accordion;
