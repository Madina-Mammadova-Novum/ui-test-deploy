'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, TextArea } from '@/elements';
import { Countdown, ModalHeader } from '@/ui';
import RadioWithText from '@/ui/RadioWithText';

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

const OfferDeclineModal = ({ setStep, closeModal }) => {
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
      <ModalHeader title="Decline the Offer" goBack={() => setStep('view_offer')} />

      <Countdown time="1d 1h 50m" customStyles="mt-5" />

      <h3 className="mt-5">Indicate the reason for decline:</h3>

      <form>
        {reasons.map(({ id, text, checked }) => (
          <RadioWithText
            key={id}
            text={text}
            checked={checked}
            customStyles="mt-2.5"
            onChange={() => handleCheck(id)}
          />
        ))}
        {showTextField && (
          <TextArea label="your reason" placeholder="Type your reason here ..." customStyles="mt-2.5" />
        )}
      </form>

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

OfferDeclineModal.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

OfferDeclineModal.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default OfferDeclineModal;
