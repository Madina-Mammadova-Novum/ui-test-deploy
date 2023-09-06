import { ChatModalHeaderPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { Button, Title } from '@/elements';

const ChatModalHeader = ({ onClose }) => {
  return (
    <div className="flex justify-between relative bg-black p-5 w-full rounded-t-base">
      <Title level="3" className="text-white text-lg">
        Chat with us
      </Title>
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-3"
        buttonProps={{ icon: { before: <CloseSVG className="fill-white" /> } }}
      />
    </div>
  );
};

ChatModalHeader.propTypes = ChatModalHeaderPropTypes;

export default ChatModalHeader;
