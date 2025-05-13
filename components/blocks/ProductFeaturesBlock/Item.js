import React from 'react';

import PropTypes from 'prop-types';

import { buttonsPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';

const Item = ({ text, buttons }) => {
  const printButton = ({ label, path }) => {
    return (
      <LinkAsButton
        key={path}
        href={path}
        buttonProps={{ variant: 'primary', size: 'large' }}
        customStyles="w-full mt-5 md:w-fit"
      >
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
