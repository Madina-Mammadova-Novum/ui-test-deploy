'use client';

import { useState } from 'react';
import { Calendar } from 'react-date-range';
import { Controller } from 'react-hook-form';

import classnames from 'classnames';

import { DatePickePropTypes } from '@/lib/types';

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
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDate = (pickedDate) => {
    onChange(transformDate(pickedDate, 'yyyy-MM-dd'));
    if (closeOnSelect) setShowPicker(false);
  };
  return (
    <div className={`${containerClass} ${expanded && showPicker ? 'h-[360px]' : 'h-auto'}`}>
      <div
        aria-hidden="true"
        className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')}
        onClick={() => setShowPicker(false)}
      />
      <Controller
        name={name}
        render={({ field }) => {
          const value = field.value || dateValue || new Date();

          return (
            <div className={`single_date relative cursor-pointer w-full ${disabled && 'opacity-70'}`}>
              <div
                aria-hidden
                onClick={() => (disabled ? setShowPicker(false) : setShowPicker((prevValue) => !prevValue))}
              >
                <Input
                  name={name}
                  customStyles={classnames(inputClass, 'pointer-events-none', showPicker && 'border-blue')}
                  label={label}
                  value={transformDate(value, 'MMM dd, yyyy')}
                  icon={<CalendarSVG className={classnames('fill-black', showPicker && '!fill-blue')} />}
                  error={error}
                  {...rest}
                />
              </div>
              <div
                className={classnames('absolute w-full bottom-3 translate-y-full left-0 hidden z-10', {
                  '!block': showPicker,
                  'opacity-30': disabled,
                })}
              >
                <Calendar
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

DatePicker.propTypes = DatePickePropTypes;

export default DatePicker;
