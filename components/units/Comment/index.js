import { useSelector } from 'react-redux';

import { CommentPropTypes } from '@/lib/types';

import { DateTimeRow, Title } from '@/elements';
import { getUserDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const Comment = ({ title = '', date = '', time = '', sentBy = '' }) => {
  const { role } = useSelector(getUserDataSelector);

  const { isCharterer, isOwner } = getRoleIdentity({ role });

  const borderColor =
    (isCharterer && sentBy === 'Charterer') || (isOwner && sentBy === 'Owner') ? 'border-green-600' : 'border-blue-600';

  const textColor =
    (isCharterer && sentBy === 'Charterer') || (isOwner && sentBy === 'Owner') ? 'text-green-600' : 'text-blue-600';

  return title ? (
    <div className={`p-2 border rounded-lg ${borderColor}`}>
      <Title level="2" className={`text-sm font-semibold ${textColor}`}>
        {sentBy}:
      </Title>
      <Title level="6" className="text-xsm font-semibold mt-2.5">
        {title}
      </Title>
      <DateTimeRow date={date} time={time} />
    </div>
  ) : null;
};

Comment.propTypes = CommentPropTypes;

export default Comment;
