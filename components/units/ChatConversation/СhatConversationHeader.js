import { ChatConversationCardPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import CollapseSVG from '@/assets/images/line.svg';
import { Button, Loader, Title, TypingIndicator } from '@/elements';
import { ChatConversationCard } from '@/units';

const СhatConversationHeader = ({ data, onCollapse, onClose, updating, typing }) => {
  return (
    <div className="flex flex-col rounded-tl-base rounded-tr-base bg-black p-5">
      <div className="relative flex h-full items-center justify-between">
        <div className="relative flex w-full items-baseline gap-2.5">
          <Title level="6" className="pb-2.5 text-lg font-bold text-white">
            Conversation
          </Title>
          {updating && <Loader className="h-3 w-3 !border-2" />}
        </div>
        <div className="absolute -right-2 -top-3 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            onClick={onCollapse}
            customStyles="!p-0 h-8"
            buttonProps={{ icon: { before: <CollapseSVG className="fill-white" /> } }}
          />
          <Button
            type="button"
            onClick={onClose}
            customStyles="!p-0 h-8"
            buttonProps={{ icon: { before: <CloseSVG className="fill-white" /> } }}
          />
        </div>
      </div>
      <div className="relative flex gap-x-5">
        <ChatConversationCard data={data} contrasted />
        <div className="absolute -top-1 right-32">{typing && <TypingIndicator size="md" />}</div>
      </div>
    </div>
  );
};

СhatConversationHeader.propTypes = ChatConversationCardPropTypes;

export default СhatConversationHeader;
