import classnames from 'classnames';

import { AccordionBodyPropTypes } from '@/lib/types';

const AccordionBody = ({ children, isFullWidth }) => {
  return (
    <div className={classnames(isFullWidth ? 'content-wrapper' : 'px-[30px]', 'space-y-2.5 pb-4 pr-[74px]')}>
      {children}
    </div>
  );
};

AccordionBody.propTypes = AccordionBodyPropTypes;

export default AccordionBody;
