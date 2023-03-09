import PropTypes from 'prop-types';

import { Comment } from '@/ui';

const IncomingCommentsContent = ({ data }) => {
  return (
    <div>
      <h3>Comments</h3>
      <h5 className="uppercase text-[12px] text-gray font-semibold mt-2.5">historical negotiating comments</h5>

      {data.map(({ title, date, time, latest }) => (
        <>
          {latest && (
            <>
              <hr className="my-4" />
              <h5 className="uppercase text-[12px] text-gray font-semibold">last charterer comment</h5>
            </>
          )}
          <Comment title={title} date={date} time={time} />
        </>
      ))}
    </div>
  );
};

IncomingCommentsContent.defaultProps = {
  data: [],
};

IncomingCommentsContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default IncomingCommentsContent;
