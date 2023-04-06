import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const AccordionBody = ({ children, isFullWidth }) => {
  return (
    <div className={classnames(!isFullWidth && 'pl-[30px]', 'pb-4 pr-[74px] content-wrapper space-y-2.5')}>
      {children}
    </div>
  );
};

AccordionBody.propTypes = {
  children: PropTypes.string,
  isFullWidth: PropTypes.bool,
};

export default AccordionBody;
