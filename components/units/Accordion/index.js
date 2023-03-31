import { useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { AccordionBody } from '@/elements';
import { AccordionHeader } from '@/units';

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="divide-y divide-gray-darker mt-1">
      {items.map(({ headerContent, bodyContent }) => (
        <div
          className={classnames(
            open ? 'relative border-none rounded-[10px] pt-[30px] bg-white shadow-xmd' : 'pt-[20px]',
            'text-black pb-2.5 peer:bg-blue-500'
          )}
        >
          <AccordionHeader onClick={() => handleOpen(1)}>{headerContent}</AccordionHeader>
          <AccordionBody>{bodyContent}</AccordionBody>
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
  activeItem: PropTypes.string.isRequired,
};

export default Accordion;
