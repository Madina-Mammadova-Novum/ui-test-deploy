'use client';

import { useState } from 'react';
import { Calendar } from 'react-date-range';

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
  inputClass = 'min-w-[296px]',
  error,
  calendarClass,
  closeOnSelect = true,
  ...rest
}) => {
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDate = (pickedDate) => {
    setDate(pickedDate);
    onChange(transformDate(pickedDate, 'yyyy-MM-dd'));
    if (closeOnSelect) setShowPicker(false);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')}
        onClick={() => setShowPicker(false)}
      />
      <div className="single_date relative cursor-pointer w-full">
        <div aria-hidden onClick={() => setShowPicker((prevValue) => !prevValue)}>
          <Input
            name={name}
            customStyles={classnames(inputClass, 'pointer-events-none', showPicker && 'border-blue')}
            label={label}
            value={transformDate(date, 'MMM dd, yyyy')}
            icon={<CalendarSVG className={classnames('fill-black', showPicker && '!fill-blue')} />}
            error={error}
            {...rest}
          />
        </div>
        <div
          className={classnames('relative w-full -top-4 left-0 hidden z-10', {
            '!block': showPicker,
          })}
        >
          <Calendar className={calendarClass} date={date} onChange={handleDate} />
        </div>
      </div>
    </>
  );
};

DatePicker.propTypes = DatePickePropTypes;

export default DatePicker;
