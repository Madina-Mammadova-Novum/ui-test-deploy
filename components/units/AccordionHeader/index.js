import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { MinusIcon, PlusIcon } from '@/assets/icons';
import { Title } from '@/elements';

const AccordionHeader = ({ children, onClick, isActive, isFullWidth }) => {
  return (
    // todo: to enable using element Button - add no-styles-variant, change text(string) to children (html element)
    <button
      className={classnames(!isFullWidth && 'px-[30px]', 'flex justify-between pb-2.5 pt-5 w-full')}
      type="button"
      onClick={onClick}
    >
      <Title level={isFullWidth ? '3' : '2'} className="text-black">
        {children}
      </Title>
      {isActive ? <MinusIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />}
    </button>
  );
};

AccordionHeader.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isFullWidth: PropTypes.bool,
};

export default AccordionHeader;
