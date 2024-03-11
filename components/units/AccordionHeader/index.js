'use client';

import classnames from 'classnames';

import { AccordionHeaderPropTypes } from '@/lib/types';

import MinusSVG from '@/assets/images/minus.svg';
import PlusSVG from '@/assets/images/plus.svg';
import { Title } from '@/elements';

const AccordionHeader = ({ title, onClick, isActive, isFullWidth }) => {
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
        {title}
      </Title>
      <div className="shrink-0">
        {isActive ? <MinusSVG className="fill-blue" /> : <PlusSVG className="fill-black" />}
      </div>
    </div>
  );
};

AccordionHeader.propTypes = AccordionHeaderPropTypes;

export default AccordionHeader;
