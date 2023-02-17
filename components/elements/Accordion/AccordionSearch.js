import { useMemo } from 'react';

import PropTypes from 'prop-types';

import AccordionSearchSM from './AccordionSM/AccordionSearch';
import AccordionSearchXL from './AccordionXL/AccordionSearch';

const AccordionSearch = ({ variant, value, onChange, isResized }) => {
  const printSearch = useMemo(() => {
    switch (variant) {
      case 'sm':
        return <AccordionSearchSM isResized={isResized} />;
      default:
        return <AccordionSearchXL value={value} isResized={isResized} onChange={onChange} />;
    }
  }, [isResized, onChange, value, variant]);

  return printSearch;
};

AccordionSearch.defaultProps = {
  value: '',
  variant: 'xl',
  isResized: false,
  onChange: () => {},
};

AccordionSearch.propTypes = {
  value: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  isResized: PropTypes.bool,
};

export default AccordionSearch;
