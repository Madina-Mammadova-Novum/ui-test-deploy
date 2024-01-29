'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import classnames from 'classnames';

import Label from '../Label';

import { RangeDatePickerPropTypes } from '@/lib/types';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const defaultDateRange = [
  {
    startDate: null,
    endDate: null,
    key: 'selection',
  },
];

const RangeDatePicker = ({ label, onChange, name, value }) => {
  const ref = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const handleChange = (e) => {
    if (e.selection.endDate) {
      setShowPicker(false);
    }

    onChange(e.selection);
    setDateRange([e.selection]);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
      } else {
        setShowPicker(true);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={classnames('range_date w-min h-fit relative range_date-absolute', !showPicker && 'range_date-hidden')}
    >
      <Label htmlFor={name} className="block text-xs-sm mb-0.5 whitespace-nowrap">
        {label}
      </Label>
      <DateRange
        months={2}
        name={name}
        editableDateInputs
        onChange={handleChange}
        startDatePlaceholder="All dates"
        endDatePlaceholder="All dates"
        direction="horizontal"
        calendarFocus="forwards"
        retainEndDateOnFirstSelection
        moveRangeOnFirstSelection={false}
        ranges={value ? dateRange : defaultDateRange}
      />
    </div>
  );
};

RangeDatePicker.propTypes = RangeDatePickerPropTypes;

export default RangeDatePicker;
