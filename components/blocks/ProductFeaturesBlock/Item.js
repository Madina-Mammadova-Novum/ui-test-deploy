import React from 'react';

import PropTypes from 'prop-types';

import { buttonsPropTypes } from '@/lib/types';

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

Item.propTypes = {
  text: PropTypes.string,
  buttons: buttonsPropTypes,
};

export default Item;
