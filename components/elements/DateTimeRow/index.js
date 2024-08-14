import { DateTimePropTypes } from '@/lib/types';

import { extractTimeFromDate } from '@/utils/helpers';

const DateTimeRow = ({ date, time }) => {
  const nextTime = time !== '' ? extractTimeFromDate(time) : extractTimeFromDate(new Date().toISOString());

  return (
    <span className="mt-1.5 text-xs-sm text-gray">
      {date} at {nextTime}
    </span>
  );
};

DateTimeRow.propTypes = DateTimePropTypes.isRequired;

export default DateTimeRow;
