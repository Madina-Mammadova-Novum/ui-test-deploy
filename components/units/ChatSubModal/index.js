import { ChatSubModalPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { Button, Title } from '@/elements';

const ChatSubModal = ({ title = '', tab = 'active', onClick, onCancel }) => {
  const ctaText = {
    active: 'Archive the chat',
    archived: 'Restore the chat',
  };

  return (
    <div className="tooltip overflow-x-hidden">
      <div className="flex flex-col gap-y-2.5 tooltip-box">
        <div className="flex justify-between gap-x-5">
          <Title level="6" className="text-xsm font-semibold">
            {title}
          </Title>

          <Button
            type="button"
            onClick={onCancel}
            className="relative -top-4 left-2"
            buttonProps={{ icon: { before: <CloseSVG className="fill-black" /> } }}
          />
        </div>
        <div className="tooltip-arrow" />
        <div className="flex justify-between gap-1.5">
          <Button buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }} onClick={onCancel} />
          <Button
            buttonProps={{ text: ctaText[tab], variant: 'delete', size: 'large' }}
            customStyles="whitespace-nowrap"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

ChatSubModal.propTypes = ChatSubModalPropTypes;

export default ChatSubModal;
