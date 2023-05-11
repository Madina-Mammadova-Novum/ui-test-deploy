import { CommentPropTypes } from '@/lib/types';

const Comment = ({ title = '', date = '', time = '' }) => {
  return (
    <>
      <h6 className="text-xsm font-semibold mt-2.5">{title}</h6>
      <div className="text-[12px] text-gray mt-1.5">
        {date} at {time}
      </div>
    </>
  );
};

Comment.propTypes = CommentPropTypes;

export default Comment;
