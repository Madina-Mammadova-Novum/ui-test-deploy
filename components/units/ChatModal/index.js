'use';

import { ChatModalPropTypes } from '@/lib/types';

import { ChatModalHeader } from '@/units';

const ChatModal = ({ isOpened, useCollapse, loading, children, onClose, onCollapse }) => {
  return (
    isOpened && (
      <div className="fixed bg-white shadow-xmd right-24 bottom-6 h-auto w-[360px] z-50 rounded-base">
        <ChatModalHeader useCollapse={useCollapse} loading={loading} onClose={onClose} onCollapse={onCollapse} />
        {children}
      </div>
    )
  );
};

ChatModal.propTypes = ChatModalPropTypes;

export default ChatModal;
