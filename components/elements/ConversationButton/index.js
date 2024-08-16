'use client';

import { ConversationButtonPropTypes } from '@/lib/types';

import ConversationSVG from '@/assets/images/conversation.svg';
import { Badge } from '@/elements';

const ConversationButton = ({ counter, onClick, className }) => {
  return (
    <div className={`${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="relative h-[30px] w-[30px] rounded-md border border-gray-light bg-transparent outline-none hover:bg-gray-darker"
      >
        <ConversationSVG className="absolute left-[5px] top-[5px] fill-black" />
        {counter && <Badge counter={counter} className="-right-1 -top-1.5 h-3.5 w-3.5 p-2" />}
      </button>
    </div>
  );
};

ConversationButton.propTypes = ConversationButtonPropTypes;

export default ConversationButton;
