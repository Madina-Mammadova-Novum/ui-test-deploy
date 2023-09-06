'use client';

import { ChatConversationCardPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import CollapseSVG from '@/assets/images/line.svg';
import { Button, Title } from '@/elements';
import { ChatConversationCard } from '@/units';

const СhatConversationHeader = ({ data, onCollapse, onClose }) => {
  return (
    <div className="bg-black p-5 flex flex-col rounded-tr-base rounded-tl-base">
      <div className="flex justify-between items-center h-full relative">
        <Title level="6" className="text-white pb-2.5 text-lg font-bold">
          Conversation
        </Title>
        <div className="flex items-center justify-end gap-2.5 absolute -right-2 -top-3">
          <Button
            type="button"
            onClick={onCollapse}
            customStyles="!p-0"
            buttonProps={{ icon: { before: <CollapseSVG className="fill-white" /> } }}
          />
          <Button
            type="button"
            onClick={onClose}
            customStyles="!p-0"
            buttonProps={{ icon: { before: <CloseSVG className="fill-white" /> } }}
          />
        </div>
      </div>
      <ChatConversationCard data={data} contrasted />
    </div>
  );
};

СhatConversationHeader.propTypes = ChatConversationCardPropTypes;

export default СhatConversationHeader;
