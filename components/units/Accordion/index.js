'use client';

import { useRef } from 'react';

import classNames from 'classnames';

import { AccordionPropTypes } from '@/lib/types';

import { AccordionBody } from '@/elements';
import { AccordionHeader } from '@/units';

const Accordion = ({ items, isFullWidth, open, onClick, icon }) => {
  const ref = useRef(null);

  return items?.map(({ headerContent, bodyContent }, index) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className={classNames(
        open && !isFullWidth && 'relative -mb-2 rounded-base !border-transparent bg-white shadow-xmd',
        'pb-2.5 text-black'
      )}
    >
      <AccordionHeader isFullWidth={isFullWidth} isActive={open} onClick={onClick} icon={icon} title={headerContent} />

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
