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

  return (
    <>
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="font-semibold text-black text-xsm">{portName}</p>
      </div>
      <DatePicker
        name="date"
        calendarClass="!w-[356px] items-center"
        onChange={handleDateChange}
        error={errors?.date?.message}
        label="open date"
      />
    </>
  );
};

DateDetailsForm.propTypes = DateDetailsFormPropTypes;

export default DateDetailsForm;
