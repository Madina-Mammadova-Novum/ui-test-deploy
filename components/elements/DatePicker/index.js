'use client';

import { useState } from 'react';
import { Calendar } from 'react-date-range';
import { Controller } from 'react-hook-form';

import classNames from 'classnames';

import { DatePickerPropTypes } from '@/lib/types';

import CalendarSVG from '@/assets/images/calendar.svg';
import { Input } from '@/elements';
import { transformDate } from '@/utils/date';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({
  name = '',
  label = '',
  onChange,
  error,
  dateValue,
  inputClass = 'min-w-[296px]',
  calendarClass = '',
  containerClass = '',
  closeOnSelect = true,
  expanded = false,
  disabled = false,
  dateVariant = 'MMM dd, yyyy',
  minDate,
  maxDate,
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDate = (pickedDate) => {
    onChange(transformDate(pickedDate, 'yyyy-MM-dd'));
    if (closeOnSelect) setShowPicker(false);
  };

  return (
    <div className={`${containerClass} ${expanded && showPicker ? 'h-[330px]' : 'h-auto'}`}>
      <div
        aria-hidden="true"
        className={classNames('fixed bottom-0 left-0 right-0 top-0 z-0', !showPicker && 'hidden')}
        onClick={() => setShowPicker(false)}
      />
      <Controller
        name={name}
        render={({ field: { ref, ...field } }) => {
          const value = field.value || dateValue || null;

          return (
            <div className={`single_date relative w-full cursor-pointer ${disabled && 'opacity-70'}`}>
              <div
                aria-hidden
                onClick={() => (disabled ? setShowPicker(false) : setShowPicker((prevValue) => !prevValue))}
              >
                <Input
                  name={name}
                  customStyles={classNames(inputClass, 'pointer-events-none', showPicker && 'border-blue')}
                  inputStyles="pr-0"
                  label={label}
                  value={transformDate(value, dateVariant)}
                  icon={<CalendarSVG className={classNames('fill-black', showPicker && '!fill-blue')} />}
                  error={error}
                  onChange={field.onChange} // Pass onChange to Input
                  ref={ref}
                  {...rest}
                />
              </div>
              <div
                className={classNames('absolute bottom-3 left-0 z-10 hidden w-full translate-y-full', {
                  '!block': showPicker,
                  'opacity-30': disabled,
                })}
              >
                <Calendar
                  minDate={minDate}
                  maxDate={maxDate}
                  className={`${calendarClass} rounded-lg`}
                  date={field.value ? new Date(field.value) : null}
                  onChange={handleDate}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

DatePicker.propTypes = DatePickerPropTypes;

export default DatePicker;
