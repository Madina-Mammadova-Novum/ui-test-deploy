'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import ChatConversationBody from './ChatConversationBody';
import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { AVAILABLE_FORMATS } from '@/lib/constants';
import { сhatSessionService } from '@/services/signalR';
import { getChatHistory } from '@/store/entities/chat/actions';
import { getAuthChatSelector } from '@/store/selectors';
import { IconUpload } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';

const ChatConversation = ({ isOpened, isMediumScreen, onCloseSession, onCollapseSession }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const token = getCookieFromBrowser('session-access-token');

  const { chats } = useSelector(getAuthChatSelector);
  const { data, updating } = chats?.user;

  // Create accept object from AVAILABLE_FORMATS
  const acceptFormats = {};

  // Map file extensions to MIME types
  const mimeTypeMap = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.odt': 'application/vnd.oasis.opendocument.text',
    '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
    '.odp': 'application/vnd.oasis.opendocument.presentation',
    '.rtf': 'application/rtf',
    '.tsv': 'text/tab-separated-values',
  };

  // Group extensions by MIME type
  AVAILABLE_FORMATS.DOCS.forEach((ext) => {
    const mimeType = mimeTypeMap[ext];
    if (mimeType) {
      if (!acceptFormats[mimeType]) {
        acceptFormats[mimeType] = [];
      }
      acceptFormats[mimeType].push(ext);
    }
  });

  const handleFileUpload = useCallback((acceptedFiles) => {
    // Handle file upload logic here
    /* eslint-disable no-console */
    console.log('Files uploaded:', acceptedFiles);
    // You can implement file upload logic similar to what's in DropzoneForm
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    noClick: true, // Disable click behavior on the root
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: acceptFormats,
  });

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
            <div {...getRootProps()} className={`flex w-full gap-2.5 ${data?.deactivated ? 'flex-col' : 'flex-row'}`}>
              <div className="relative flex w-full items-center">
                <Input
                  type="text"
                  value={message}
                  onChange={handleMessage}
                  placeholder="Message ..."
                  customStyles="!border-gray-darker !w-full"
                />
                {!data?.deactivated && (
                  <div className="absolute right-2">
                    <IconUpload getInputProps={getInputProps} onClick={() => {}} />
                  </div>
                )}
              </div>
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
