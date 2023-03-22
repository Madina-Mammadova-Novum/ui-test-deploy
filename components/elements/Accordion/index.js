'use client';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { AccordionSm, AccordionXl } from '@/elements';

const Accordion = ({ data, variant, opened, active, onChange }) => {
  const printAccordion = useMemo(() => {
    switch (variant) {
      case 'collapsed':
        return <AccordionSm data={data} active={active} onChange={onChange} />;
      case 'opened':
        return <AccordionXl opened={opened} data={data} active={active} onChange={onChange} />;
      default:
        return <AccordionXl opened={opened} data={data} active={active} onChange={onChange} />;
    }
  }, [active, data, onChange, opened, variant]);

  return printAccordion;
};

Accordion.propTypes = {
  opened: PropTypes.bool,
  active: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
export default Accordion;
