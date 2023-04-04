import PropTypes from 'prop-types';

import { TextArea } from '@/elements';

const MessageContent = ({ data }) => {
  return (
    <div>
      <h3>Message</h3>
      {data.map(({ text }) => (
        <p className="text-xsm mt-2.5 ">{text}</p>
      ))}
      <TextArea label="other terms and conditions" placeholder="Type your message here ..." customStyles="mt-4" />
    </div>
  );
};

MessageContent.defaultProps = {
  data: [],
};

MessageContent.propTypes = {
  data: PropTypes.shape([]),
};

export default MessageContent;
