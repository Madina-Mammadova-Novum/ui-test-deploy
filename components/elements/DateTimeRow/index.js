import { DateTimePropTypes } from '@/lib/types';

const DateTimeRow = ({ date, time }) => (
  <span className="text-xs-sm text-gray mt-1.5">
    {date} at {time}
  </span>
);

DateTimeRow.propTypes = DateTimePropTypes.isRequired;

export default DateTimeRow;
