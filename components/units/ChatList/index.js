'use client';

import { ChatListPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { ChatSession } from '@/units';

const ChatList = ({ data }) => {
  const printChatSession = (session, index) => (
    <>
      {index !== 0 && <Divider />}
      <ChatSession data={session} />
    </>
  );

  return (
    <div className="p-5 h-[320px] overflow-y-scroll flex flex-col gap-y-4">
      {data?.length > 0 ? data?.map(printChatSession) : <p className="mx-auto font-semibold text-gray">No Data</p>}
    </div>
  );
};

ChatList.propTypes = ChatListPropTypes;

export default ChatList;
