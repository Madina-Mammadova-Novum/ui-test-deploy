import React from 'react';

import PropTypes from 'prop-types';

import { buttonsPropTypes } from '@/lib/types';

import { LinkAsButton, Title } from '@/elements';

const AccordionCTA = ({ title, buttons, shortDescription }) => {
  return (
    <div className="rounded-base border border-gray-darker bg-gray-light px-5 py-3">
      {title && <Title level="3">{title}</Title>}
      <div className="flex gap-x-2.5 items-center">
        {shortDescription && <p className="text-xsm">{shortDescription}</p>}
        {buttons &&
          buttons.map(({ path, label }) => {
            return (
              <LinkAsButton key={path} href={path} buttonProps={{ variant: 'primary', size: 'medium' }}>
                {label}
              </LinkAsButton>
            );
          })}
      </div>
    </div>
  );
};

AccordionCTA.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  buttons: buttonsPropTypes,
};

export default AccordionCTA;
