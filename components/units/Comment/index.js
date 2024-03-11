import { CommentPropTypes } from '@/lib/types';

import { DateTimeRow, Title } from '@/elements';

const Comment = ({ title = '', date = '', time = '' }) => {
  return title ? (
    <>
      <Title level="6" className="text-xsm font-semibold mt-2.5">
        {title}
      </Title>
      <DateTimeRow date={date} time={time} />
    </>
  ) : null;
};

Comment.propTypes = CommentPropTypes;

export default Comment;
