'use client';

import { ChatListPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { ChatSession } from '@/units';

const ChatList = ({ data }) => {
  const printChatSession = (session) => (
    <>
      <Divider />
      <ChatSession data={session} />
    </>
  );

  return <div className="px-5">{data?.map(printChatSession)}</div>;
};

ChatList.propTypes = ChatListPropTypes;

export default ChatList;
