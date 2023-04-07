import React from 'react';

import { ctaPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';

const Item = ({ text, buttons }) => {
  return (
    <div>
      <p>{text}</p>
      {buttons &&
        buttons.map(({ label, path }) => {
          return (
            <LinkAsButton href={path} buttonProps={{ variant: 'secondary', size: 'large' }} customStyles="w-fit mt-5">
              {label}
            </LinkAsButton>
          );
        })}
    </div>
  );
};

Item.propTypes = ctaPropTypes;

export default Item;
