import React, { useState } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@/styles/datepicker.css'
import { DateRange } from 'react-date-range';
import classnames from 'classnames';

const RangeDatePicker = () => {
    const [showPicker, setShowPicker] = useState(false)
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    return (
        <>
            <div className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')} onClick={() => setShowPicker(false)}/>
            <div className={classnames('range_date w-min relative', !showPicker && 'range_date-hidden')} onFocusCapture={() => !showPicker && setShowPicker(true)} onClick={() => !showPicker && setShowPicker(true)}>
                <DateRange
                    editableDateInputs={true}
                    onChange={e => setDateRange([e.selection])}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                    ranges={dateRange}
                />
            </div>
        </>
    )
}

export default RangeDatePicker