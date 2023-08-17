import { ChatSessionPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import { ArchiveButton, ConversationButton, Title } from '@/elements';

const ChatSession = ({ data }) => {
  const { title, description, cargoId, unreaded, isActive } = data;

  return (
    <div className="flex justify-between py-4">
      <div className="text-black flex items-center gap-x-1.5">
        <ShipIcon isActive={isActive} />
        <div className="flex flex-col">
          <Title level="6" className="text-sm font-semibold">
            {title}
          </Title>
          {description && <p className="text-xsm">{description}</p>}
          {cargoId && (
            <p className="uppercase text-xs-sm font-semibold text-black">
              cargo id: <span className="text-blue font-bold text-xs-sm cursor-pointer">{cargoId}</span>
            </p>
          )}
          <span className="text-blue text-xsm font-medium pt-1.5 cursor-pointer">Show all info</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <ConversationButton counter={unreaded} />
        <ArchiveButton />
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
