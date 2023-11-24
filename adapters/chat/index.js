import { convertDate, transformDate } from '@/utils/date';
import {
  addLocalDateFlag,
  clientIdentification,
  extractTimeFromDate,
  getListOfDataByDays,
  sortFromPastToToday,
} from '@/utils/helpers';

export function chatSessionResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

function chatSessionDataAdapter({ data }) {
  if (!data) return {};

  const { id, contentId, archieved, isOnline, messageCount } = data;

  return {
    key: `${archieved ? 'archieved' : 'active'}`,
    chatId: id,
    contentId,
    archieved,
    messageCount,
    isTyping: false,
    isOnline,
  };
}

function chatDealDataAdapter({ data }) {
  if (!data) return {};

  const { searchedCargo, products, vessel } = data;

  return {
    vessel: {
      name: vessel?.details?.name?.toLowerCase(),
      imo: vessel?.imo?.toLowerCase(),
      type: searchedCargo?.cargoType?.name?.toLowerCase(),
      cargoId: searchedCargo?.code.toLowerCase(),
      products: products?.map((product) => ({ id: product?.id, name: product?.productName?.toLowerCase() })),
      data: {
        tankersPerYear: vessel?.company?.estimatedAverageTankerDWT,
        yearsOfOperation: vessel?.company?.details?.yearsInOperation,
        countryOfRegestration: vessel?.details?.registeredOwner,
        countryOfRegestrationCode: vessel?.details?.registeredOwnerCountryId,
      },
    },
    additional: {
      terminal: {
        name: searchedCargo?.loadTerminal?.port?.name,
        code: searchedCargo?.loadTerminal?.port?.locode,
        countryId: searchedCargo?.loadTerminal?.port?.countryId,
      },
      totalQuantity: searchedCargo?.totalQuantity?.toLocaleString(),
      laycanStart: transformDate(searchedCargo?.laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(searchedCargo?.laycanEnd, 'MMM dd, yyyy'),
    },
  };
}

export function helpCenterDataAdapter({ data }) {
  if (!data) return null;

  return [
    {
      archieved: false,
      chatId: data?.chat?.id,
      created: data?.createdAt,
      messageCount: data?.chat?.messageCount,
      key: 'support',
      isTyping: false,
      vessel: {
        id: data?.broker?.id,
        name: `${data?.broker?.name} ${data?.broker?.surname}`,
      },
    },
  ];
}

export function listOfChatsDataAdapter({ data }) {
  if (!data) return [];

  return data.map(({ chat, deal }) => ({
    ...chatSessionDataAdapter({ data: chat }),
    ...chatDealDataAdapter({ data: deal }),
  }));
}

export function messageDataAdapter({ data, session }) {
  if (!data) return null;

  const { body, senderId, createdAt, id } = data;

  return {
    id,
    message: body,
    time: extractTimeFromDate(addLocalDateFlag(createdAt), { hour: 'numeric', minute: 'numeric', hour12: false }),
    sender: clientIdentification({ senderId, session }),
  };
}

export function messagesDataAdapter({ data, session }) {
  const sortedArray = data?.map((el) => el).sort(sortFromPastToToday);

  const messagesByDate = sortedArray.reduce((acc, currentValue) => {
    const date = convertDate(currentValue?.createdAt);

    acc[date] = [...(acc[date] ?? []), messageDataAdapter({ data: currentValue, session })];

    return acc;
  }, {});

  return getListOfDataByDays(messagesByDate);
}

export function moreMessagesDataAdapter({ payload, messages }) {
  if (!messages) return [];

  return [...messages, ...payload]?.reduce((accamulator, { title, data }) => {
    accamulator[title] = {
      title,
      data: [...(accamulator[title]?.data ?? []), ...data],
    };

    return accamulator;
  }, {});
}

export function chatHistoryResponseAdapter({ data, session }) {
  if (!data) return null;

  const { messages, created, isLast } = data?.data;

  return {
    data: {
      created,
      isLast,
      messages: messagesDataAdapter({ data: messages || [], session }),
    },
  };
}

export function chatSupportResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}
