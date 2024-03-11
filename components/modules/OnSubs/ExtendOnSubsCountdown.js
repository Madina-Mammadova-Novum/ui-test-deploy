'use client';

/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';

import { Button, Dropdown } from '@/elements';
import { requestCountdownExtension } from '@/services/offer';
import { ModalHeader } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const countdownOptions = [
  {
    label: '30 min',
    value: 30,
  },
  {
    label: '1 hour',
    value: 60,
  },
  {
    label: '2 hours',
    value: 120,
  },
  {
    label: '3 hours',
    value: 180,
  },
  {
    label: '6 hours',
    value: 360,
  },
  {
    label: '12 hours',
    value: 720,
  },
];

const ExtendOnSubsCountdown = ({ closeModal, offerId, onExtensionSuccess }) => {
  const [selectedOption, setSelectedOption] = useState(countdownOptions[0]);
  const [pending, setPending] = useState(false);

  const handleSelectOption = (option) => setSelectedOption(option);

  const handleRequestCountdownExtension = async () => {
    setPending(true);
    const { error, message: successMessage } = await requestCountdownExtension({
      data: { option: selectedOption, offerId },
    });
    setPending(false);

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(successMessage);
      onExtensionSuccess();
      closeModal();
    }
  };

  return (
    <div className="w-[292px] h-[324px]">
      <ModalHeader>Request to change countdown</ModalHeader>
      <div className="bg-gray-light rounded-[10px] p-3 border border-darker text-[12px] my-5">
        In order to increase countdown time, please, send the request. The countdown will be changed only after Broker's
        approval.
      </div>
      <div className="border-l-2 border-blue pl-4">
        <p className="text-[12px] font-bold mb-2.5">
          Choose time which you want to add to countdown. Maximum 12 hours.
        </p>
        <Dropdown
          options={countdownOptions}
          defaultValue={countdownOptions[0]}
          customStyles={{ className: 'w-28' }}
          classNames={{ menuList: () => '!max-h-20' }}
          onChange={handleSelectOption}
        />
      </div>
      <div className="flex justify-between gap-2.5 mt-5">
        <Button
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
          onClick={closeModal}
          customStylesFromWrap="w-full"
          customStyles="w-full"
        />
        <Button
          buttonProps={{ text: pending ? 'Please wait...' : 'Send request', variant: 'tertiary', size: 'large' }}
          customStyles="whitespace-nowrap !bg-black text-white"
          onClick={handleRequestCountdownExtension}
          disabled={pending}
        />
      </div>
    </div>
  );
};

ExtendOnSubsCountdown.propTypes = ExtendOnSubsCountdown;

export default ExtendOnSubsCountdown;
