'use client';

import { useState } from 'react';

import ModalHeader from '../ModalHeader';

import { OfferDeclinePropTypes } from '@/lib/types';

import { Button, RadioInput, TextArea, Title } from '@/elements';
import { Countdown } from '@/units';
import { useHookForm } from '@/utils/hooks';

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

const OfferDeclineFields = ({ closeModal, title = '', goBack, showCancelButton = true }) => {
  const [reasons, setReasons] = useState(reasonsOfDecline);
  const [showTextField, setShowTextField] = useState(false);
  const { register } = useHookForm();
  const handleCheck = (id) => {
    setReasons((prevState) =>
      prevState.map((reason) => (reason.id === id ? { ...reason, checked: true } : { ...reason, checked: false }))
    );
    setShowTextField(id === 5);
  };

  return (
    <div className="w-[300px]">
      <ModalHeader goBack={goBack}>{title}</ModalHeader>
      <Countdown time="1d 1h 50m" customStyles="mt-5" />
      <Title level={3} className="mt-5">
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
        <TextArea
          name="comment"
          label="your reason"
          placeholder="Type your reason here ..."
          customStyles="mt-2.5"
          register={register}
        />
      )}

      <div className="grid grid-cols-2 gap-x-2.5 mt-5 h-10">
        <div>
          <Button
            onClick={closeModal}
            customStyles={`w-full ${!showCancelButton && 'hidden'}`}
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
          />
        </div>
        <div>
          <Button
            customStyles="whitespace-nowrap w-full hidden"
            buttonProps={{ text: 'Send the Decline', variant: 'delete', size: 'large' }}
          />
        </div>
      </div>
    </div>
  );
};

OfferDeclineFields.propTypes = OfferDeclinePropTypes;

export default OfferDeclineFields;
