import { CommentPropTypes } from '@/lib/types';

const Comment = ({ title = '', date = '', time = '' }) => {
  return (
    <>
      <h6 className="mt-2.5 break-all text-xsm font-semibold">{title}</h6>
      <div className="mt-1.5 text-[12px] text-gray">
        {date} at {time}
      </div>
    </>
  );
};

Comment.propTypes = CommentPropTypes;

export default Comment;
