'use client';

import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

import classnames from 'classnames';

import Label from '../Label';

import { RangeDatePickerPropTypes } from '@/lib/types';

const defaultDateRange = [
  {
    startDate: null,
    endDate: null,
    key: 'selection',
  },
];

const RangeDatePicker = ({ label, onChange, name, value }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState(defaultDateRange);

  return (
    <>
      <div
        aria-hidden
        className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')}
        onClick={() => setShowPicker(false)}
      />
      <div
        aria-hidden
        className={classnames(
          'range_date w-min h-fit relative range_date-absolute',
          !showPicker && 'range_date-hidden'
        )}
        onFocusCapture={() => !showPicker && setShowPicker(true)}
        onClick={() => !showPicker && setShowPicker(true)}
      >
        <Label htmlFor={name} className="block text-xs-sm mb-0.5 whitespace-nowrap">
          {label}
        </Label>
        <DateRange
          name={name}
          editableDateInputs
          startDatePlaceholder="All dates"
          endDatePlaceholder="All dates"
          onChange={(e) => {
            onChange(e.selection);
            setDateRange([e.selection]);
          }}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          ranges={value ? dateRange : defaultDateRange}
        />
      </div>
    </>
  );
};

RangeDatePicker.propTypes = RangeDatePickerPropTypes;

export default RangeDatePicker;
