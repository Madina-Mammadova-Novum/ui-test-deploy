'use client';

import { useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import { ChatConversationCardPropTypes } from '@/lib/types';

import ShipIcon from '@/assets/icons/ShipIcon';
import ArrowSVG from '@/assets/images/small-arrow.svg';
import { TextRow, Title } from '@/elements';
import { getGeneralDataSelector } from '@/store/selectors';
import { ChartererInformationContent, ModalWindow } from '@/units';
import { getCountryById } from '@/utils/helpers';

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

  const textColor = contrasted ? 'text-white' : 'text-black';

  const printAdditionalProducts = ({ id, name }, index) => (
    <TextRow key={id} title={`Product #${index + 1}`} className="!text-xs-sm">
      {name || '-'}
    </TextRow>
  );

  const printCountryFlag = useMemo(() => {
    const country = getCountryById({ data: countries, id: additional?.terminal?.countryId });

    return <ReactCountryFlag countryCode={country?.countryCode} svg />;
  }, [countries, additional?.terminal?.countryId]);

  const printAdditionalData = useMemo(() => {
    return (
      setMore && (
        <div className="h-auto pt-1.5">
          <TextRow title="Load terminal" className="!text-xs-sm">
            <span className="flex gap-x-1">
              {printCountryFlag}
              {additional?.terminal?.name || '-'}
            </span>
          </TextRow>
          <TextRow title="Laycan" className="whitespace-nowrap !text-xs-sm pb-2.5">
            {additional?.laycanStart} to {additional?.laycanEnd}
          </TextRow>
          {additional?.products?.map(printAdditionalProducts)}
          <TextRow title="Total Quantity" className="!text-xs-sm">
            {additional?.totalQuantity || '-'} tons
          </TextRow>
        </div>
      )
    );
  }, [additional, setMore, printCountryFlag]);

  const printCargoeModal = useMemo(() => {
    const country = getCountryById({
      data: countries,
      id: vessel?.data?.countryOfRegestrationCode,
    });

    return (
      <ModalWindow
        buttonProps={{
          variant: 'primary',
          size: 'small',
          text: vessel?.cargoId,
          className: '!p-0 !text-xs-sm !bg-transparent',
        }}
      >
        <ChartererInformationContent title="Charterer information" data={{ ...vessel?.data, country }} />
      </ModalWindow>
    );
  }, [vessel?.cargoId, vessel?.data]);

  return (
    <div className="text-black flex items-start gap-x-1.5">
      <ShipIcon isActive={isActive} />
      <div className="flex flex-col">
        <Title level="6" className={`text-sm font-semibold capitalize ${textColor}`}>
          {vessel?.name}
        </Title>
        {subtitle && <p className={`text-xsm ${textColor}`}>{subtitle}</p>}
        {vessel?.cargoId && (
          <p className={`uppercase text-xs-sm font-semibold text-black flex  ${textColor}`}>
            cargo id:
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
