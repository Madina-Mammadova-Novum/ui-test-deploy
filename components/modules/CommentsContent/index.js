'use client';

import { CommentsContentPropTypes } from '@/lib/types';

import { TextArea, Title } from '@/elements';
import { Comment } from '@/units';

const CommentsContent = ({ data = [], areaDisabled = false }) => {
  return (
    <div>
      <Title level="3">Comments</Title>
      {data.length && (
        <>
          <Title level="5" className="uppercase text-[12px] text-gray font-semibold mt-2.5">
            historical negotiating comments
          </Title>

          {data.map(({ title, date, time }) => (
            <Comment title={title} date={date} time={time} />
          ))}
        </>
      )}

      {!areaDisabled && (
        <>
          <hr className="my-4" />
          <TextArea name="comment" label="your comment" placeholder="Type your message here" customStyles="!w-full" />
        </>
      )}
    </div>
  );
};

CommentsContent.propTypes = CommentsContentPropTypes;

export default CommentsContent;
