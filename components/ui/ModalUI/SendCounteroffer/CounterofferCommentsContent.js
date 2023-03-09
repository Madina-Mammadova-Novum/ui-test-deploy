'use client';

import PropTypes from 'prop-types';

import { TextArea } from '@/elements';
import { Comment } from '@/ui';

const CounterofferCommentsContent = ({ data, areaDisabled }) => {
  return (
    <div>
      <h3>Comments</h3>
      <h5 className="uppercase text-[12px] text-gray font-semibold mt-2.5">historical negotiating comments</h5>

      {data.map(({ title, date, time }) => (
        <Comment title={title} date={date} time={time} />
      ))}

      {!areaDisabled && (
        <>
          <hr className="my-4" />
          <TextArea label="your comment" placeholder="Type your message here" customStyles="!w-full" />
        </>
      )}
    </div>
  );
};

CounterofferCommentsContent.defaultProps = {
  data: [],
  areaDisabled: false,
};

CounterofferCommentsContent.propTypes = {
  data: PropTypes.shape([]),
  areaDisabled: PropTypes.bool,
};

export default CounterofferCommentsContent;
