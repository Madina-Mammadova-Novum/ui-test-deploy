import React, { useState } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@/styles/datepicker.css'
import { Calendar } from 'react-date-range';
import { Input } from '@/elements'
import classnames from 'classnames';
import CalendarSVG from '@/assets/images/calendar.svg'

const DatePicker = () => {
    const [date, setDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false)
    
    return (
        <>
            <div className={classnames('fixed top-0 left-0 right-0 bottom-0 z-0', !showPicker && 'hidden')} onClick={() => setShowPicker(false)}/>
            <div className='single_date relative w-fit'>
                <button type='button' onClick={() => setShowPicker(prevValue => !prevValue)} >
                    <Input customStyles={classnames('pointer-events-none !w-[296px]', showPicker && 'border-blue')} label="date" value={date} icon={<CalendarSVG className={classnames('fill-black', showPicker && '!fill-blue')} />}/>
                </button>
                <div className={classnames('absolute bottom-0 translate-y-[95%] left-0 hidden z-10', {
                    '!block': showPicker
                })}>
                    <Calendar
                        date={date}
                        onChange={pickedDate => setDate(pickedDate)}
                    />
                </div>
            </div>
        </>
    )
}

export default DatePicker