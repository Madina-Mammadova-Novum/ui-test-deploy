'use client';

import { useMemo } from 'react';
import Linkify from 'react-linkify';

import Link from 'next/link';

import { ChatConversationMessagePropTypes } from '@/lib/types';

import { ROLES } from '@/lib';

const ChatConversationMessage = ({ sender, message, time, isBroker }) => {
  const senderTitle = useMemo(() => {
    switch (sender) {
      case ROLES.OWNER:
        return 'vessel owner';
      case ROLES.CHARTERER:
        return 'charterer';
      case ROLES.BROKER:
        return 'ship.link broker';
      default:
        return '';
    }
  }, [sender, ROLES]);

  const renderLink = (href) => {
    return (
      <Link href={href} target="_blank">
        {href}
      </Link>
    );
  };

  return (
    <div className={`flex flex-col py-2.5 w-full ${isBroker ? 'items-start' : 'items-end pr-2.5'}`}>
      <div className="flex flex-col gap-y-1">
        <p className="text-black uppercase text-xs-sm font-semibold">{senderTitle}</p>
        <p
          className={`${
            isBroker ? 'bg-gray-darker bg-opacity-40 self-start' : 'bg-blue bg-opacity-10 self-end'
          } rounded-base px-2.5 py-1.5 text-xsm relative break-all`}
        >
          <Linkify componentDecorator={renderLink}>{message}</Linkify>
        </p>
        <div className={`text-xs-sm text-gray font-normal flex w-full ${isBroker ? 'justify-start' : 'justify-end'} `}>
          {time}
        </div>
      </div>
    </div>
  );
};

ChatConversationMessage.propTypes = ChatConversationMessagePropTypes;

export default ChatConversationMessage;
