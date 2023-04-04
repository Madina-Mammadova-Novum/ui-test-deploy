import PropTypes from 'prop-types';

const Comment = ({ title, date, time }) => {
  return (
    <>
      <h6 className="text-xsm font-semibold mt-2.5">{title}</h6>
      <div className="text-[12px] text-gray mt-1.5">
        {date} at {time}
      </div>
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
