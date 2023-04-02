'use client';

import { useRef } from 'react';

import PropTypes from 'prop-types';

import AccordionNestedLink from '@/elements/Accordion/AccordionNestedLink';

const AccordionBody = ({ list, toggle, className }) => {
  const ref = useRef(null);

  const printLink = (link) => <AccordionNestedLink key={link.id} data={link} />;

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-all relative -top-2 px-5 ${className}`}
      style={{ height: toggle ? `${ref?.current?.scrollHeight}px` : '0px' }}
    >
      {list?.map(printLink)}
    </div>
  );
};

export default AccordionBody;

AccordionBody.defaultProps = {
  className: '',
};

AccordionBody.propTypes = {
  toggle: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};
