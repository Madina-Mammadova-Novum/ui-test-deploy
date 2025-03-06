'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatConversationBody from './ChatConversationBody';
import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { getChatHistory } from '@/store/entities/chat/actions';
import { getAuthChatSelector } from '@/store/selectors';
import { getCookieFromBrowser } from '@/utils/helpers';

const ChatConversation = ({ isOpened, isMediumScreen, onCloseSession, onCollapseSession }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const token = getCookieFromBrowser('session-access-token');

  const { chats } = useSelector(getAuthChatSelector);
  const { data, updating } = chats?.user;

  const initChatActions = useCallback(async () => {
    сhatSessionService.onToggle(isOpened);

    if (isOpened) {
      await сhatSessionService.init({ chatId: data.chatId, token });
      dispatch(getChatHistory({ data: { id: data?.chatId } }));
    }
  }, [data?.chatId, isOpened, token]);

  useEffect(() => {
    initChatActions();
  }, [isOpened, token, data?.chatId]);

  useEffect(() => {
    if (message !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    сhatSessionService.sendMessage({ message });
    setMessage('');
  };

  const handleMessage = ({ target: { value } }) => setMessage(value);

  const setConversationPosition = useMemo(() => {
    if (isMediumScreen && isOpened) return 'right-24';
    return 'right-[480px]';
  }, [isMediumScreen, isOpened]);

  return (
    isOpened && (
      <div
        className={`fixed border border-gray-light bg-white ${setConversationPosition} bottom-6 z-10 h-auto w-[360px] rounded-base shadow-xmd`}
      >
        <СhatConversationHeader
          data={data}
          updating={updating}
          typing={data?.isTyping}
          onClose={onCloseSession}
          onCollapse={onCollapseSession}
        />
        <div className="flex flex-col p-2.5">
          <ChatConversationBody />
          <form className="flex w-full grow items-end gap-x-2.5" onSubmit={handleSubmit}>
            <div className={`flex w-full gap-2.5 ${data?.deactivated ? 'flex-col' : 'flex-row'}`}>
              <Input
                type="text"
                value={message}
                onChange={handleMessage}
                placeholder="Message ..."
                customStyles="!border-gray-darker !w-full"
              />
              <Button
                type="submit"
                disabled={disabled}
                customStyles="border border-gray-darker w-full !p-2.5"
                buttonProps={{
                  variant: 'tertiary',
                  size: 'small',
                  icon: { before: !data?.deactivated && <PlaneSVG /> },
                  text: data?.deactivated ? 'Request to deactivate' : '',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

ChatConversation.propTypes = ChatConversationPropTypes;

export default ChatConversation;
