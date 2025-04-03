'use';

import { ChatModalPropTypes } from '@/lib/types';

import { ChatModalHeader } from '@/units';

const ChatModal = ({ isOpened, useCollapse, loading, children, onClose, onCollapse }) => {
  return (
    isOpened && (
      <div className="fixed bottom-6 right-24 z-100 h-auto w-[360px] rounded-base bg-white shadow-xmd md:z-10">
        <ChatModalHeader useCollapse={useCollapse} loading={loading} onClose={onClose} onCollapse={onCollapse} />
        {children}
      </div>
    )
  );
};

ChatModal.propTypes = ChatModalPropTypes;

export default ChatModal;
