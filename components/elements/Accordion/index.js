'use client';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { AccordionSm, AccordionXl } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const Accordion = ({ data, variant, opened, onChange }) => {
  const { isActive } = useSidebarActiveColor(data.path);

  const printAccordion = useMemo(() => {
    switch (variant) {
      case 'collapsed':
        return <AccordionSm data={data} active={isActive} onChange={onChange} />;
      default:
        return <AccordionXl opened={opened} data={data} active={isActive} onChange={onChange} />;
    }
  }, [isActive, data, onChange, opened, variant]);

  return printAccordion;
};

Accordion.propTypes = {
  opened: PropTypes.bool,
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
