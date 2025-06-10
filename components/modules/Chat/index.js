'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { ROUTES } from '@/lib/constants';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
import { AuthChat } from '@/units';

const Chat = ({ token }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { opened, messageCount } = useSelector(getAuthChatSelector);

  const handleOpen = () => dispatch(setOpenedChat(!opened));

  const isAccountRoute = pathname.startsWith(ROUTES.ACCOUNT);

  const memoizedChatButton = useMemo(() => {
    // Only render chat button on account routes
    if (!isAccountRoute) {
      return null;
    }

    return (
      <>
        <ChatButton
          variant="default"
          onClick={handleOpen}
          counter={messageCount}
          className="fixed bottom-[5.5rem] right-5 z-10 block msm:bottom-14 md:bottom-2"
        />
        <AuthChat opened={opened} token={token} />
      </>
    );
  }, [token, opened, messageCount, handleOpen, isAccountRoute]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
