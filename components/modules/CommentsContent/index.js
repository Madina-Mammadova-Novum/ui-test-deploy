'use client';

import { CommentsContentPropTypes } from '@/lib/types';

import { TextArea, Title } from '@/elements';
import { Comment } from '@/units';
import { useHookForm } from '@/utils/hooks';

const CommentsContent = ({ data = [], areaDisabled = false }) => {
  const { register, formState } = useHookForm();

  return (
    <div className="py-2">
      <Title level="3">Comments</Title>
      {!!data.length && (
        <>
          <Title level="5" className="mt-2.5 text-[12px] font-semibold uppercase text-gray">
            historical negotiating comments
          </Title>
          <div className="my-2 flex flex-col gap-1.5">
            {data.map(({ title, date, time, sentBy }) => (
              <Comment key={`${title}-${date}-${time}`} title={title} date={date} time={time} sentBy={sentBy} />
            ))}
          </div>
        </>
      )}

      {!areaDisabled && (
        <>
          <hr className="my-4" />
          <TextArea
            name="comment"
            label="Your comment"
            placeholder="Type your message here"
            customStyles="!w-full"
            {...register('comment')}
            error={formState?.errors?.comment?.message}
          />
        </>
      )}
    </div>
  );
};

CommentsContent.propTypes = CommentsContentPropTypes;

export default CommentsContent;
