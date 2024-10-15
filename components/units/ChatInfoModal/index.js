import { ChatInfoModalPropTypes } from '@/lib/types';

import { ChartererInformationContent, ModalWindow } from '@/units';
import { getCountryById } from '@/utils/helpers';

const ChatInfoModal = ({ data }) => {
  const { vessel, countries } = data;

  const country = getCountryById({
    data: countries,
    id: vessel?.data?.countryOfRegistrationCode,
  });

  return (
    <ModalWindow
      containerClass="!border !border-gray-light shadow-xmd"
      buttonProps={{
        variant: 'primary',
        size: 'small',
        text: vessel?.cargoId.toUpperCase(),
        className: '!p-0 !text-xs-sm !bg-transparent',
      }}
    >
      <ChartererInformationContent title="Charterer information" data={{ ...vessel?.data, country }} />
    </ModalWindow>
  );
};

ChatInfoModal.propTypes = ChatInfoModalPropTypes;

export default ChatInfoModal;
