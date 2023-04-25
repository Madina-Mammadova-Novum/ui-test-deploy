import React from 'react';

import { ctaPropTypes } from '@/lib/types';

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
              <LinkAsButton href={path} buttonProps={{ variant: 'primary', size: 'medium' }}>
                {label}
              </LinkAsButton>
            );
          })}
      </div>
    </div>
  );
};

AccordionCTA.propTypes = ctaPropTypes;

export default AccordionCTA;
