import PropTypes from 'prop-types';

import { DateTimeRow, Title } from '@/elements';

const Comment = ({ title, date, time }) => {
  return (
    <>
      <Title component="h6" className="text-xsm font-semibold mt-2.5">
        {title}
      </Title>
      <DateTimeRow date={date} time={time} />
    </>
  );
};

Comment.defaultProps = {
  title: '',
  date: '',
  time: '',
};

Comment.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};

export default Comment;
