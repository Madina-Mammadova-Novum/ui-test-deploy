import React from 'react';

import { ctaPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';

const Item = ({ text, buttons }) => {
  const printButton = ({ label, path }) => {
    return (
      <LinkAsButton href={path} buttonProps={{ variant: 'secondary', size: 'large' }} customStyles="w-fit mt-5">
        {label}
      </LinkAsButton>
    );
  };

  return (
    <div>
      <p className="text-xsm">{text}</p>
      {buttons && buttons.map(printButton)}
    </div>
  );
};

Item.propTypes = ctaPropTypes;

export default Item;
