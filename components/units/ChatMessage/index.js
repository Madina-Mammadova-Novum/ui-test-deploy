'use client';

import { useMemo } from 'react';
import Linkify from 'react-linkify';

import Link from 'next/link';

import { ChatConversationMessagePropTypes } from '@/lib/types';

import { ROLES } from '@/lib';
import { extractTimeFromDate } from '@/utils/helpers';

const ChatConversationMessage = ({ sender, message, time, isBroker, id }) => {
  const nextTime = extractTimeFromDate(time);

  const senderTitle = useMemo(() => {
    switch (sender) {
      case ROLES.OWNER:
        return 'vessel owner';
      case ROLES.CHARTERER:
        return 'charterer';
      case ROLES.BROKER:
        return 'support operator';
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

  return (
    <div key={id} className={`flex flex-col py-2.5 w-full ${isBroker ? 'items-start' : 'items-end pr-2.5'}`}>
      <div className="flex flex-col gap-y-1">
        <p className="text-black uppercase text-xs-sm font-semibold">{senderTitle}</p>
        <p
          className={`relative rounded-base px-2.5 py-1.5 text-xsm break-words ${
            isBroker ? 'bg-gray-darker bg-opacity-40 self-start' : 'bg-blue-light self-end'
          } `}
        >
          {message?.includes('@') ? message : <Linkify componentDecorator={renderLink}>{message}</Linkify>}
          <div
            className={`triangle ${
              !isBroker
                ? '!border-b-blue-light -right-[7px] top-3 rotate-90'
                : '!border-b-gray-darker !border-opacity-40 -left-[7px] top-3 -rotate-90'
            }`}
          />
        </p>

        <div className={`text-xs-sm text-gray font-normal flex w-full ${isBroker ? 'justify-start' : 'justify-end'} `}>
          {nextTime}
        </div>
      </div>
    </div>
  );
};

ChatConversationMessage.propTypes = ChatConversationMessagePropTypes;

export default ChatConversationMessage;
