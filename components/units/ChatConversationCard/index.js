'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { ChatConversationCardPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import { Title } from '@/elements';
import { setConversation, setOpenedChat } from '@/store/entities/chat/slice';
import { getCurrnetDealStage } from '@/store/entities/notifications/actions';
import { resetDealData } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { ChatAdditional } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';

const ChatConversationCard = ({ data, contrasted = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = useState({ setMore: false });
  const role = getCookieFromBrowser('session-user-role');

  const { deal } = useSelector(getNotificationsDataSelector);

  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleShowMore = (e) => {
    e.stopPropagation();
    handleChangeState('setMore', !state.setMore);
  };

  const getDealStage = useCallback(() => {
    dispatch(getCurrnetDealStage({ id: data?.dealId, role }));
  }, [dispatch, role, data?.dealId]);

  const handleRedirect = useCallback(
    (e) => {
      e.stopPropagation();

      if (deal?.route) {
        router.push(deal.route);
        dispatch(setConversation(false));
        dispatch(setOpenedChat(false));
      }
    },
    [dispatch, deal.route]
  );

  const resetDealStage = () => {
    dispatch(resetDealData());
  };

  const printCargoeModal = useMemo(() => {
    return (
      data?.vessel?.cargoId && (
        <p
          onMouseEnter={getDealStage}
          onMouseLeave={resetDealStage}
          className={`${
            contrasted ? 'text-white' : 'text-black'
          } uppercase text-xs-sm font-semibold text-black flex gap-x-1.5`}
        >
          cargo id:
          <span
            aria-hidden
            onClick={handleRedirect}
            className="text-blue font-bold text-xs-sm cursor-pointer uppercase"
          >
            {data?.vessel.cargoId}
          </span>
        </p>
      )
    );
  }, [data?.vessel?.cargoId, getDealStage, resetDealStage, handleRedirect]);

  return (
    <div className="text-black flex items-start gap-x-1.5 w-auto">
      <ShipIcon isOnline={data?.isOnline} />
      <div className="flex flex-col">
        <Title
          level="6"
          className={`text-sm font-semibold capitalize ${contrasted ? 'text-white' : 'text-black hover:text-blue'}`}
        >
          {data?.vessel?.name}
        </Title>
        {data?.subtitle && <p className={`text-xsm ${contrasted ? 'text-white' : 'text-black'}`}>{data?.subtitle}</p>}
        {printCargoeModal}
        {!contrasted && (
          <ChatAdditional
            isActive={state.setMore}
            onClick={handleShowMore}
            data={{ vessel: data?.vessel, additional: data?.additional }}
          />
        )}
      </div>
    </div>
  );
};

ChatConversationCard.propTypes = ChatConversationCardPropTypes;

export default ChatConversationCard;
