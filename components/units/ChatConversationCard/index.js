'use client';

import { useMemo, useState } from 'react';

import { ChatConversationCardPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import ArrowSVG from '@/assets/images/small-arrow.svg';
import { TextRow, Title } from '@/elements';
import { ChartererInformationContent, ModalWindow } from '@/units';

const ChatConversationCard = ({ data, contrasted = false }) => {
  const { title, description, cargoId, additional, isActive } = data;

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

  const textColor = contrasted ? 'text-white' : 'text-black';

  const printAdditionalProducts = ({ id, name }, index) => (
    <TextRow key={id} title={`Product #${index}`} className="!text-xs-sm">
      {name || '-'}
    </TextRow>
  );

  const printAdditionalData = useMemo(() => {
    return (
      setMore && (
        <div className="h-auto pt-1.5">
          <TextRow title="Load terminal" className="!text-xs-sm">
            {additional?.port || '-'}
          </TextRow>
          <TextRow title="Laycan" className="whitespace-nowrap !text-xs-sm pb-2.5">
            {additional?.laycan || '-'}
          </TextRow>
          {additional?.products?.map(printAdditionalProducts)}
          <TextRow title="Total Quantity" className="!text-xs-sm">
            {additional?.quantity || '-'}
          </TextRow>
        </div>
      )
    );
  }, [additional, setMore]);

  const printCargoeModal = useMemo(() => {
    return (
      <ModalWindow
        buttonProps={{
          variant: 'primary',
          size: 'small',
          text: cargoId,
          className: '!p-0 !text-xs-sm !bg-transparent',
        }}
      >
        <ChartererInformationContent title="Charterer information" />
      </ModalWindow>
    );
  }, [cargoId]);

  return (
    <div className="text-black flex items-start gap-x-1.5">
      <ShipIcon isActive={isActive} />
      <div className="flex flex-col">
        <Title level="6" className={`text-sm font-semibold ${textColor}`}>
          {title}
        </Title>
        {description && <p className={`text-xsm ${textColor}`}>{description}</p>}
        {cargoId && (
          <p className={`uppercase text-xs-sm font-semibold text-black flex  ${textColor}`}>
            cargo id:{' '}
            <span
              aria-hidden
              className="text-blue font-bold text-xs-sm cursor-pointer"
              onClick={() => handleChangeState('setCargoeInfo', !setCargoeInfo)}
            >
              {printCargoeModal}
            </span>
          </p>
        )}
        {additional && (
          <>
            <span
              aria-hidden
              onClick={() => handleChangeState('setMore', !setMore)}
              className="text-blue flex items-center gap-x-1.5 text-xsm font-medium pt-1.5 cursor-pointer"
            >
              Show all info
              <ArrowSVG
                className={`transform transition-all ease-in-out duration-300 ${setMore ? '-rotate-180' : 'rotate-0'}`}
              />
            </span>
            {printAdditionalData}
          </>
        )}
      </div>
    </div>
  );
};

ChatConversationCard.propTypes = ChatConversationCardPropTypes;

export default ChatConversationCard;
