'use client';

import { useMemo, useState } from 'react';

import { ChatSessionPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import ArrowSVG from '@/assets/images/small-arrow.svg';
import { ArchiveButton, ConversationButton, TextRow, Title } from '@/elements';

const ChatSession = ({ data }) => {
  const [more, setMore] = useState(false);

  const { title, description, cargoId, unreaded, isActive, additional } = data;

  const printAdditionalProducts = ({ id, name }, index) => (
    <TextRow key={id} title={`Product #${index}`} className="!text-xs-sm">
      {name || '-'}
    </TextRow>
  );

  const printAdditionalData = useMemo(() => {
    return (
      more && (
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
  }, [additional, more]);

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
            <p className="uppercase text-xs-sm font-semibold text-black">
              cargo id: <span className="text-blue font-bold text-xs-sm cursor-pointer">{cargoId}</span>
            </p>
          )}
          <span
            aria-hidden
            onClick={() => setMore(!more)}
            className="text-blue flex items-center gap-x-1.5 text-xsm font-medium pt-1.5 cursor-pointer"
          >
            Show all info
            <ArrowSVG
              className={`transform transition-all ease-in-out duration-300 ${more ? '-rotate-180' : 'rotate-0'}`}
            />
          </span>

          {printAdditionalData}
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <ConversationButton counter={unreaded} />
        <ArchiveButton />
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
