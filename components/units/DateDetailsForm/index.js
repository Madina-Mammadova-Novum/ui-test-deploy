import { addDays } from 'date-fns';

import { DateDetailsFormPropTypes } from '@/lib/types';

import { DatePicker, Label } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const DateDetailsForm = ({ portName = '' }) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useHookForm();

  const handleDateChange = (value) => {
    clearErrors('date');
    setValue('date', value);
  };

  const nextDay = addDays(new Date(), 1);

  return (
    <>
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="font-semibold text-black text-xsm">{portName}</p>
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
