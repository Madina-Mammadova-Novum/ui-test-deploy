'use client';

import { useCallback, useState } from 'react';

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

const OfferDeclineFields = ({ closeModal, title = '', goBack, showCancelButton = true, offerDetails }) => {
  const [reasons, setReasons] = useState(reasonsOfDecline);
  const [showTextField, setShowTextField] = useState(false);
  const { countdownData } = offerDetails;
  const { setValue, register } = useHookForm();

  const handleChange = ({ target }) => setValue('reason', target.value);

  const handleCheck = useCallback(
    (id) => {
      setReasons((prevState) =>
        prevState.map((reason) => (reason.id === id ? { ...reason, checked: true } : { ...reason, checked: false }))
      );

      setShowTextField(id === reasons[reasons.length - 1].id);

      const chosenReason = reasons.find((reason) => reason.id === id);

      if (chosenReason.id !== reasons[reasons.length - 1].id) {
        setValue('reason', chosenReason.text);
      } else {
        setValue('reason', '');
      }
    },
    [reasons, setValue]
  );

  return (
    <div className="w-[300px]">
      <ModalHeader goBack={goBack}>{title}</ModalHeader>
      <Countdown time={countdownData} customStyles="mt-5" />
      <Title level={3} className="mt-5">
        Indicate the reason for decline:
      </Title>

      {reasons.map(({ id, text, checked }) => (
        <RadioInput
          key={id}
          name={`reason-${id}`}
          checked={checked}
          customStyles="mt-2.5"
          labelStyles="text-xsm mt-2.5"
          onChange={() => handleCheck(id)}
        >
          {text}
        </RadioInput>
      ))}
      {showTextField && (
        <TextArea
          name="reason"
          label="your reason"
          placeholder="Type your reason here ..."
          customStyles="mt-2.5"
          onChange={handleChange}
          {...register('reason')}
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
      </div>
    </div>
  );
};

OfferDeclineFields.propTypes = OfferDeclinePropTypes;

export default OfferDeclineFields;
