import { ChatModalPropTypes } from '@/lib/types';

import { ChatModalHeader } from '@/units';

const ChatModal = ({ isOpened, children, onClose }) => {
  return (
    isOpened && (
      <div className="fixed bg-white shadow-xmd right-24 bottom-6 h-auto w-[360px] z-50 rounded-base">
        <ChatModalHeader onClose={onClose} />
        {children}
      </div>
    )
  );
};

ChatModal.propTypes = ChatModalPropTypes;

export default ChatModal;
