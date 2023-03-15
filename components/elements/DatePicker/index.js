'use client';

import { useState } from 'react';
import { Calendar } from 'react-date-range';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import CalendarSVG from '@/assets/images/calendar.svg';
import { Input } from '@/elements';
import { transformDate } from '@/utils/date';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({ name, label, onChange, inputClass, error, ...rest }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDate = (pickedDate) => {
    onChange(pickedDate);
    setDate(pickedDate);
  };

  return (
    <>
      <div
        aria-hidden
        className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')}
        onClick={() => setShowPicker(false)}
      />
      <div className="single_date relative cursor-pointer">
        <div aria-hidden onClick={() => setShowPicker((prevValue) => !prevValue)}>
          <Input
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
  inputClass: 'w-[296px]',
  error: null,
  onChange: () => {},
};

DatePicker.propTypes = {
  inputClass: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default DatePicker;
