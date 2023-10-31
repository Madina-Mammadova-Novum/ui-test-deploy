'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChatConversationCardPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import { Title } from '@/elements';
import { getGeneralDataSelector } from '@/store/selectors';
import { ChatAdditional, ChatInfoModal } from '@/units';

const ChatConversationCard = ({ data, contrasted = false }) => {
  const { additional, vessel, isActive, subtitle } = data;

  const { countries } = useSelector(getGeneralDataSelector);

  const [state, setState] = useState({
    setMore: false,
    setCargoeInfo: false,
  });

  const { setMore, setCargoeInfo } = state;

  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleShowMore = (e) => {
    e.stopPropagation();

    handleChangeState('setMore', !setMore);
  };

  const printCargoeModal = useMemo(() => {
    return (
      vessel?.cargoId && (
        <p className={`${contrasted ? 'text-white' : 'text-black'} uppercase text-xs-sm font-semibold text-black flex`}>
          cargo id:
          <span
            aria-hidden
            className="text-blue font-bold text-xs-sm cursor-pointer"
            onClick={() => handleChangeState('setCargoeInfo', !setCargoeInfo)}
          >
            <ChatInfoModal data={{ vessel, countries }} />
          </span>
        </p>
      )
    );
  }, [vessel, countries, setCargoeInfo]);

  return (
    <div className="text-black flex items-start gap-x-1.5 w-full">
      <ShipIcon isActive={isActive} />
      <div className="flex flex-col">
        <Title
          level="6"
          className={`text-sm font-semibold capitalize ${contrasted ? 'text-white' : 'text-black hover:text-blue'}`}
        >
          {vessel?.name}
        </Title>
        {subtitle && <p className={`text-xsm ${contrasted ? 'text-white' : 'text-black'}`}>{subtitle}</p>}
        {printCargoeModal}
        {!contrasted && (
          <ChatAdditional data={{ vessel, countries, additional }} isActive={setMore} onClick={handleShowMore} />
        )}
      </div>
    </div>
  );
};

ChatConversationCard.propTypes = ChatConversationCardPropTypes;

export default ChatConversationCard;
