'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { ChatListPropTypes } from '@/lib/types';

import { ChatListLoader, Divider } from '@/elements';
import { ChatSession } from '@/units';

const ChatList = ({ data, loading = true, tab = 'active' }) => {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    if (sessionId) {
      setSessionId('');
    }
  }, [tab]);

  const printChatSession = (session, index) => (
    <Fragment key={index}>
      {index !== 0 && <Divider />}
      <ChatSession tab={tab} data={session} sessionId={sessionId} setSessionId={setSessionId} />
    </Fragment>
  );

  const printContent = useMemo(() => {
    if (loading) return <ChatListLoader />;
    if (data?.length > 0) return data?.map(printChatSession);
    return <p className="mx-auto font-semibold text-gray">No Data</p>;
  }, [loading, data, printChatSession]);

  return (
    <div className="relative flex h-[320px] flex-col gap-y-4 overflow-x-hidden overflow-y-scroll p-2">
      {printContent}
    </div>
  );
};

ChatList.propTypes = ChatListPropTypes;

export default ChatList;
