'use client';

/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Dropdown } from '@/elements';
import { submitTaskExtensionRequest } from '@/services/assignedTasks';
import { ModalHeader } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const ExtendCountdown = ({
  closeModal,
  offerId,
  taskId,
  onExtensionSuccess,
  title = 'Request to change countdown',
  description = "In order to increase countdown time, please, send the request. The countdown will be changed only after Broker's approval.",
  options = [],
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pending, setPending] = useState(false);

  // Update selectedOption when options change
  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  const handleSelectOption = (option) => setSelectedOption(option);

  const handleRequestCountdownExtension = async () => {
    if (!selectedOption) {
      errorToast('Error', 'Please select an extension time');
      return;
    }

    setPending(true);

    try {
      const { error, message: successMessage } = await submitTaskExtensionRequest({
        taskId,
        data: {
          requestedMinutes: selectedOption.value,
          description: `Requesting extension for offer ${offerId}`,
        },
      });

      setPending(false);

      if (error) {
        errorToast(error?.title || 'Extension Request Failed', error?.message);
      } else {
        successToast(successMessage || 'Extension request submitted successfully');
        onExtensionSuccess(selectedOption.value);
        closeModal();
      }
    } catch (err) {
      setPending(false);
      console.error('Extension request error:', err);
      errorToast('Extension Request Failed', 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex max-h-[600px] w-[356px] flex-col gap-5">
      <ModalHeader className="w-full max-w-[272px]">{title}</ModalHeader>
      <div className="border-darker rounded-[10px] border bg-gray-light px-5 py-3 text-[12px]">{description}</div>
      <div className="border-l-2 border-blue pl-4">
        <p className="mb-2.5 text-[12px] font-bold">
          Choose time which you want to add to countdown. Maximum {options[options.length - 1]?.label}.
        </p>
        <Dropdown
          options={options}
          defaultValue={selectedOption}
          value={selectedOption}
          customStyles={{ dropdownWidth: 130, className: 'w-48' }}
          onChange={handleSelectOption}
        />
      </div>
      <div className="flex justify-between gap-2.5">
        <Button
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
          onClick={closeModal}
          customStylesFromWrap="w-full"
          customStyles="w-full"
        />
        <Button
          buttonProps={{ text: pending ? 'Please wait...' : 'Send request', variant: 'tertiary', size: 'large' }}
          customStyles="whitespace-nowrap !bg-black text-white w-full"
          customStylesFromWrap="w-full"
          onClick={handleRequestCountdownExtension}
          disabled={pending || !selectedOption}
        />
      </div>
    </div>
  );
};

ExtendCountdown.propTypes = {
  closeModal: PropTypes.func.isRequired,
  offerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onExtensionSuccess: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default ExtendCountdown;
