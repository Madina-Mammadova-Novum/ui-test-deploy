import { useMemo } from 'react';

import PropTypes from 'prop-types';

import AccordionSM from './AccordionSM';
import AccordionXL from './AccordionXL';

const Accordion = ({ data, variant }) => {
  const printAccordion = useMemo(() => {
    switch (variant) {
      case 'collapsed':
        return <AccordionSM data={data} />;
      case 'opened':
        return <AccordionXL data={data} />;
      default:
        return <AccordionXL data={data} />;
    }
  }, [data, variant]);
  return printAccordion;
};

Accordion.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
export default Accordion;
