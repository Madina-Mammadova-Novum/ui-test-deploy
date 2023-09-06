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
        className="w-[30px] h-[30px] relative rounded-md border border-gray-light outline-none bg-transparent hover:bg-gray-darker"
      >
        <ConversationSVG className="fill-black absolute top-[5px] left-[5px]" />
        {counter && <Badge counter={counter} className="h-3.5 w-3.5 p-2 -top-1.5 -right-1" />}
      </button>
    </div>
  );
};

ConversationButton.propTypes = ConversationButtonPropTypes;

export default ConversationButton;
