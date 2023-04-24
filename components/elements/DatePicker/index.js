'use client';

import React, { useState } from 'react';
import { Calendar } from 'react-date-range';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import CalendarSVG from '@/assets/images/calendar.svg';
import { Input } from '@/elements';
import { transformDate } from '@/utils/date';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({ name, label, onChange, inputClass, error, closeOnSelect, ...rest }) => {
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
          className={classnames('absolute bottom-0 translate-y-[95%] left-0 hidden z-10', {
            '!block': showPicker,
          })}
        >
          <Calendar date={date} onChange={handleDate} />
        </div>
      </div>
    </>
  );
};

DatePicker.defaultProps = {
  name: '',
  label: '',
  inputClass: 'min-w-[296px]',
  error: null,
  closeOnSelect: true,
  register: () => {},
  setValue: () => {},
  onChange: () => {},
};

DatePicker.propTypes = {
  inputClass: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func,
  register: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};

export default DatePicker;
