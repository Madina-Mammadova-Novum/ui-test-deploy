'use client';

import { useEffect } from 'react';

import { addDays } from 'date-fns';

import { DateDetailsFormPropTypes } from '@/lib/types';

import { DatePicker, Label } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const DateDetailsForm = ({ portName = '' }) => {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useHookForm();

  const handleDateChange = (value) => {
    clearErrors('date');
    setValue('disabled', false);
    setValue('date', value);
  };

  const prefilledDate = watch('date');
  const nextDay = addDays(new Date(), 1);

  useEffect(() => {
    setValue('disabled', true);

    if (prefilledDate) {
      setValue('date', prefilledDate);
    }
  }, []);

  return (
    <>
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="text-xsm font-semibold text-black">{portName}</p>
      </div>
      <DatePicker
        name="date"
        label="open date"
        minDate={nextDay}
        error={errors?.date?.message}
        onChange={handleDateChange}
        calendarClass="!w-[356px] items-center"
        expanded
      />
    </>
  );
};

DateDetailsForm.propTypes = DateDetailsFormPropTypes;

export default DateDetailsForm;
