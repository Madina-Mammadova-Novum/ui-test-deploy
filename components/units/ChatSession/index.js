'use client';

import { useMemo, useState } from 'react';

import { ChatSessionPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import ArrowSVG from '@/assets/images/small-arrow.svg';
import { ArchiveButton, ConversationButton, TextRow, Title } from '@/elements';
import { ChartererInformationContent, ChatDeactivate, ModalWindow } from '@/units';

const ChatSession = ({ data }) => {
  const [modalState, setModalState] = useState({
    setMore: false,
    setDeactivate: false,
    setConversation: false,
    setCargoeInfo: false,
  });

  const handleChangeState = (key, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { title, description, cargoId, unreaded, isActive, additional } = data;

  const { setMore, setDeactivate, setConversation, setCargoeInfo } = modalState;

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

  const printDeactivateModal = useMemo(() => {
    return (
      setDeactivate && (
        <ChatDeactivate
          title="Do you want to archive this chat?"
          onCancel={() => handleChangeState('setDeactivate', false)}
        />
      )
    );
  }, [setDeactivate]);

  const printCargoeModal = useMemo(() => {
    return (
      <ModalWindow
        buttonProps={{
          variant: 'primary',
          size: 'small',
          text: cargoId,
          className: '!p-0 !text-xs-sm',
        }}
      >
        <ChartererInformationContent title="Charterer information" />
      </ModalWindow>
    );
  }, [cargoId]);

  return (
    <div className="flex justify-between">
      <div className="text-black flex items-start gap-x-1.5">
        <ShipIcon isActive={isActive} />
        <div className="flex flex-col">
          <Title level="6" className="text-sm font-semibold">
            {title}
          </Title>
          {description && <p className="text-xsm">{description}</p>}
          {cargoId && (
            <p className="uppercase text-xs-sm font-semibold text-black flex">
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
        </div>
      </div>
      <div className="flex flex-col">
        <ConversationButton counter={unreaded} onClick={() => handleChangeState('setConversation', !setConversation)} />
        <ArchiveButton onClick={() => handleChangeState('setDeactivate', !setDeactivate)} />
        {printDeactivateModal}
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
