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
    <div key={id} className={`flex w-full flex-col py-2.5 ${isBroker ? 'items-start' : 'items-end pr-2.5'}`}>
      <div className="flex flex-col gap-y-1">
        <p className="text-xs-sm font-semibold uppercase text-black">{senderTitle}</p>
        <p
          className={`relative break-words rounded-base px-2.5 py-1.5 text-xsm ${
            isBroker ? 'self-start bg-gray-darker bg-opacity-40' : 'self-end bg-blue-light'
          } `}
        >
          {message?.includes('@') ? message : <Linkify componentDecorator={renderLink}>{message}</Linkify>}
          <span
            className={`triangle ${
              !isBroker
                ? '-right-[7px] top-3 rotate-90 !border-b-blue-light'
                : '-left-[7px] top-3 -rotate-90 !border-b-gray-darker !border-opacity-40'
            }`}
          />
        </p>

        <div className={`flex w-full text-xs-sm font-normal text-gray ${isBroker ? 'justify-start' : 'justify-end'} `}>
          {nextTime}
        </div>
      </div>
    </div>
  );
};

ChatConversationMessage.propTypes = ChatConversationMessagePropTypes;

export default ChatConversationMessage;
