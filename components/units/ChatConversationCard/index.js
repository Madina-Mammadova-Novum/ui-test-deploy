'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { ChatConversationCardPropTypes } from '@/lib/types';

import { ShipIcon, UserIcon } from '@/assets/icons';
import { HoverTooltip, Title } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { setConversation, setOpenedChat } from '@/store/entities/chat/slice';
import { getCurrentDealStage } from '@/store/entities/notifications/actions';
import { resetDealData } from '@/store/entities/notifications/slice';
import { getAuthChatSelector, getNotificationsDataSelector } from '@/store/selectors';
import { ChatAdditional, Flag } from '@/units';
import { getCookieFromBrowser, getLocode } from '@/utils/helpers';

const ChatConversationCard = ({ data, contrasted = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = useState({ setMore: false });
  const role = getCookieFromBrowser('session-user-role');

  const { deal } = useSelector(getNotificationsDataSelector);
  const { chats } = useSelector(getAuthChatSelector);
  const { user } = chats;

  const totalQuantity = `${data?.additional?.totalQuantity} mt`;
  const cargoProduct = `${data?.vessel?.type} (${totalQuantity})`;
  const isHelpCenter = contrasted && user?.data?.key === 'support';
  const cargoProductHoverData = useMemo(() => {
    if (!cargoProduct) {
      return { displayText: '', tooltipDisabled: true };
    }

    const shouldTruncate = cargoProduct.length > SETTINGS.MAX_VISIBLE_TEXT_LENGTH_CHAT;

    return {
      displayText: shouldTruncate ? `${cargoProduct.slice(0, SETTINGS.MAX_VISIBLE_TEXT_LENGTH_CHAT)}...` : cargoProduct,
      tooltipDisabled: !shouldTruncate,
    };
  }, [cargoProduct]);

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
    dispatch(getCurrentDealStage({ id: data?.dealId, role }));
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

  const printCargoModal = useMemo(() => {
    return (
      data?.vessel?.cargoId && (
        <p
          onMouseEnter={getDealStage}
          onMouseLeave={resetDealStage}
          className={`${
            contrasted ? 'text-white' : 'text-black'
          } flex gap-x-1.5 text-xs-sm font-semibold uppercase text-black`}
        >
          cargo id:
          <span
            aria-hidden
            onClick={handleRedirect}
            className="cursor-pointer text-xs-sm font-bold uppercase text-blue"
          >
            {data?.vessel.cargoId}
          </span>
        </p>
      )
    );
  }, [data?.vessel?.cargoId, getDealStage, resetDealStage, handleRedirect]);

  return (
    <div className={`flex w-auto gap-x-1.5 text-black ${isHelpCenter ? 'items-center' : 'items-start'}`}>
      {isHelpCenter ? <UserIcon isOnline={data?.isOnline} /> : <ShipIcon isOnline={data?.isOnline} />}
      <div className="flex flex-col">
        <Title
          level="6"
          className={`flex items-center text-sm font-semibold capitalize ${contrasted ? 'text-white' : 'text-black hover:text-blue'}`}
        >
          <Flag countryCode={getLocode(data?.vessel?.flagOfRegistry)} className="mr-1" /> {data?.vessel?.name}
        </Title>

        {data?.subtitle && <p className={`text-xsm ${contrasted ? 'text-white' : 'text-black'}`}>{data?.subtitle}</p>}
        {!isHelpCenter && contrasted && (
          <div className="flex gap-x-1.5 text-xs-sm font-semibold uppercase text-white">
            cargo product:
            <HoverTooltip data={{ description: cargoProduct }} disabled={cargoProductHoverData.tooltipDisabled}>
              <span className="text-xs-sm font-bold uppercase text-white">{cargoProductHoverData.displayText}</span>
            </HoverTooltip>
          </div>
        )}
        {printCargoModal}
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
