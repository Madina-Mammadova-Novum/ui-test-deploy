import classnames from 'classnames';

import { AccordionHeaderPropTypes } from '@/lib/types';

import { MinusIcon, PlusIcon } from '@/assets/icons';
import { Title } from '@/elements';

const AccordionHeader = ({ children, onClick, isActive, isFullWidth }) => {
  return (
    <div
      aria-hidden
      className={classnames(
        !isFullWidth && 'px-[30px]',
        'flex gap-x-5 justify-between pb-2.5 pt-5 w-full cursor-pointer'
      )}
      onClick={onClick}
    >
      <Title level={isFullWidth ? '3' : '2'} className="text-black">
        {children}
      </Title>
      <div className="shrink-0">
        {isActive ? <MinusIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />}
      </div>
    </div>
  );
};

AccordionHeader.propTypes = AccordionHeaderPropTypes;

export default AccordionHeader;
