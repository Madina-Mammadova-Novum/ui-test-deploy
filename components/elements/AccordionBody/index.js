import classnames from 'classnames';

import { AccordionBodyPropTypes } from '@/lib/types';

const AccordionBody = ({ children, isFullWidth }) => {
  return (
    <div className={classnames(!isFullWidth && 'pl-[30px]', 'pb-4 pr-[74px] content-wrapper space-y-2.5')}>
      {children}
    </div>
  );
};

AccordionBody.propTypes = AccordionBodyPropTypes;

export default AccordionBody;
