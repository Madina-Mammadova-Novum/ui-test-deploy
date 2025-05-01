'use client';

import { useMemo, useState } from 'react';
import Linkify from 'react-linkify';

import Link from 'next/link';

import { ChatConversationMessagePropTypes } from '@/lib/types';

import FileInfoAltSVG from '@/assets/images/fileInfoAlt.svg';
import { Button } from '@/elements';
import { ROLES } from '@/lib';
import { extractTimeFromDate, handleViewDocument } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ChatConversationMessage = ({
  sender,
  message,
  time,
  isBroker,
  id,
  type = 'Message',
  fileName = 'Document',
  fileUrl = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const nextTime = extractTimeFromDate(time);

  // Check if it's a file message by type
  const isFileMessage = type === 'File';

  const senderTitle = useMemo(() => {
    switch (sender) {
      case ROLES.OWNER:
        return 'vessel owner';
      case ROLES.CHARTERER:
        return 'charterer';
      case ROLES.BROKER:
        return 'ship.link broker';
      case ROLES.SUPPORT:
        return 'support operator';
      default:
        return 'anonymous';
    }
  }, [sender, ROLES]);

  const renderLink = (href) => {
    return (
      <Link href={href} target="_blank">
        {href}
      </Link>
    );
  };

  const handleDocumentView = async (url) => {
    setIsLoading(true);
    try {
      await handleViewDocument(url);
    } catch (error) {
      errorToast('View Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render message content based on type
  const renderMessageContent = () => {
    if (isFileMessage) {
      if (fileUrl) {
        return (
          <Button
            disabled={isLoading}
            customStyles="max-w-[250px] overflow-hidden break-all whitespace-normal !px-2.5 !py-1 text-left"
            onClick={() => handleDocumentView(fileUrl)}
            buttonProps={{
              variant: 'tertiary',
              size: 'large',
              icon: { before: <FileInfoAltSVG className="fill-black" /> },
              text: fileName,
            }}
          />
        );
      }
    }

    return message?.includes('@') ? message : <Linkify componentDecorator={renderLink}>{message}</Linkify>;
  };

  return (
    <div key={id} className={`flex w-full flex-col py-2.5 ${isBroker ? 'items-start' : 'items-end pr-2.5'}`}>
      <div className="flex flex-col gap-y-1">
        <p className="text-xs-sm font-semibold uppercase text-black">{senderTitle}</p>
        <div
          className={`relative break-words rounded-base px-2.5 py-1.5 text-xsm ${
            isBroker ? 'self-start bg-gray-darker bg-opacity-40' : 'self-end bg-blue-light'
          }`}
        >
          {renderMessageContent()}
          <span
            className={`triangle ${
              !isBroker
                ? '-right-[7px] top-3 rotate-90 !border-b-blue-light'
                : '-left-[7px] top-3 -rotate-90 !border-b-gray-darker !border-opacity-40'
            }`}
          />
        </div>

        <div className={`flex w-full text-xs-sm font-normal text-gray ${isBroker ? 'justify-start' : 'justify-end'} `}>
          {nextTime}
        </div>
      </div>
    </div>
  );
};

ChatConversationMessage.propTypes = ChatConversationMessagePropTypes;

export default ChatConversationMessage;
