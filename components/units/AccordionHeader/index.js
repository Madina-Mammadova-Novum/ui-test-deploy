'use client';

import classNames from 'classnames';

import { AccordionHeaderPropTypes } from '@/lib/types';

import MinusSVG from '@/assets/images/minus.svg';
import PlusSVG from '@/assets/images/plus.svg';
import { Title } from '@/elements';

const AccordionHeader = ({ title, onClick, isActive, isFullWidth }) => {
  return (
    <div
      aria-hidden
      className={classNames(
        !isFullWidth && 'px-[30px]',
        'flex w-full cursor-pointer justify-between gap-x-5 pb-2.5 pt-5'
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
