'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, RadioInput, TextArea, Title } from '@/elements';
import { Countdown } from '@/units';

const reasonsOfDecline = [
  {
    id: 1,
    text: 'Offer is outside the market workable range',
    checked: false,
  },
  {
    id: 2,
    text: 'Unacceptable compliance risk',
    checked: false,
  },
  {
    id: 3,
    text: 'Unacceptable credit risk',
    checked: false,
  },
  {
    id: 4,
    text: 'Unacceptable performance risk',
    checked: false,
  },
  {
    id: 5,
    text: 'Other',
    checked: false,
  },
];

const OfferDeclineFields = ({ closeModal }) => {
  const [reasons, setReasons] = useState(reasonsOfDecline);
  const [showTextField, setShowTextField] = useState(false);
  const handleCheck = (id) => {
    setReasons((prevState) =>
      prevState.map((reason) => (reason.id === id ? { ...reason, checked: true } : { ...reason, checked: false }))
    );
    setShowTextField(id === 5);
  };

  return (
    <div className="w-[300px]">
      <Title component="h2">Decline Pre-fixture Offer</Title>
      <Countdown time="1d 1h 50m" customStyles="mt-5" />
      <Title component="h3" className="mt-5">
        Indicate the reason for decline:
      </Title>

      {reasons.map(({ id, text, checked }) => (
        <div className="mt-2.5">
          <RadioInput
            key={id}
            name={`option${id}`}
            checked={checked}
            labelStyles="text-xsm"
            onChange={() => handleCheck(id)}
          >
            {text}
          </RadioInput>
        </div>
      ))}
      {showTextField && (
        <TextArea name="comment" label="your reason" placeholder="Type your reason here ..." customStyles="mt-2.5" />
      )}

      <div className="flex gap-x-2.5 mt-5">
        <Button
          onClick={closeModal}
          customStyles="w-full h-min"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          customStyles="whitespace-nowrap"
          buttonProps={{ text: 'Send the Decline', variant: 'delete', size: 'large' }}
        />
      </div>
    </div>
  );
};

OfferDeclineFields.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

OfferDeclineFields.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default OfferDeclineFields;
