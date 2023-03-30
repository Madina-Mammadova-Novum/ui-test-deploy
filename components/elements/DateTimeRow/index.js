import PropTypes from 'prop-types';

const DateTimeRow = ({ date, time }) => (
  <div className="text-[12px] text-gray mt-1.5">
    {date} at {time}
  </div>
);

DateTimeRow.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default DateTimeRow;
