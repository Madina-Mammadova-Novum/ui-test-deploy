import { tokenAdapter } from '@/adapters/user';
import { convertDate, transformDate } from '@/utils/date';
import { addLocalDateFlag, clientIdentification, getListOfDataByDays, sortFromPastToToday } from '@/utils/helpers';

export function chatSessionResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

function chatSessionDataAdapter({ data }) {
  if (!data) return {};

  const { id, contentId, archived, messageCount, deactivated, isOnline } = data;

  return {
    key: `${archived ? 'archived' : 'active'}`,
    chatId: id,
    contentId,
    archived,
    messageCount,
    deactivated,
    isTyping: false,
    isOnline,
  };
}

function chatDealDataAdapter({ data }) {
  if (!data) return {};

  const { searchedCargo, products, vessel, id, laycanEnd, laycanStart } = data;

  return {
    dealId: id,
    vessel: {
      name: vessel?.details?.name?.toLowerCase(),
      imo: vessel?.imo?.toLowerCase(),
      type: searchedCargo?.cargoType?.name?.toLowerCase(),
      cargoId: searchedCargo?.code.toLowerCase(),
      products: products?.map((product) => ({ id: product?.id, name: product?.productName?.toLowerCase() })),
      flagOfRegistry: vessel?.details?.flagOfRegistry?.codeISO2 || vessel?.details?.flagOfRegistry?.codeISO3,
      data: {
        tankersPerYear: vessel?.company?.estimatedAverageTankerDWT,
        yearsOfOperation: vessel?.company?.details?.yearsInOperation,
        countryOfRegistration: vessel?.details?.registeredOwner,
        countryOfRegistrationCode: vessel?.details?.registeredOwnerCountryId,
      },
    },
    additional: {
      terminal: {
        name: searchedCargo?.loadTerminal?.port?.name,
        code: searchedCargo?.loadTerminal?.port?.locode,
        countryId: searchedCargo?.loadTerminal?.port?.countryId,
      },
      totalQuantity: searchedCargo?.totalQuantity?.toLocaleString(),
      laycanStart: transformDate(laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(laycanEnd, 'MMM dd, yyyy'),
    },
  };
}

export function helpCenterDataAdapter({ data }) {
  if (!data) return null;

  return [
    {
      archived: false,
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

export function messageDataAdapter({ data, clientId, role }) {
  if (!data) return null;

  const { body, senderId, createdAt, id, type, fileName, fileUrl } = data;

  return {
    id,
    type,
    message: body,
    time: addLocalDateFlag(createdAt),
    sender: clientIdentification({ senderId, clientId, role }),
    fileName,
    fileUrl,
  };
}

export function messagesDataAdapter({ data, role, clientId }) {
  const sortedArray = data?.map((el) => el).sort(sortFromPastToToday);

  const messagesByDate = sortedArray.reduce((acc, currentValue) => {
    const date = convertDate(currentValue?.createdAt);

    acc[date] = [...(acc[date] ?? []), messageDataAdapter({ data: currentValue, role, clientId })];

    return acc;
  }, {});

  return getListOfDataByDays(messagesByDate);
}

export function moreMessagesDataAdapter({ payload, messages }) {
  if (!messages) return [];

  return [...payload, ...messages]?.reduce((accumulator, { title, data }) => {
    // Get existing data for this title/day if it exists
    const existingData = accumulator[title]?.data || [];

    // Track existing message IDs to avoid duplicates
    const existingIds = new Set(existingData.map((msg) => msg?.id));

    // Filter out duplicates from the new data
    const updatedData = data.filter((msg) => !existingIds.has(msg?.id));

    accumulator[title] = {
      title,
      data: [...existingData, ...updatedData],
    };

    return accumulator;
  }, {});
}

export function chatHistoryResponseAdapter({ data, clientId, role }) {
  if (!data) return null;
  const { messages = [], created, isLast } = data;

  return {
    data: {
      created,
      isLast,
      messages: messagesDataAdapter({ data: messages, clientId, role }),
    },
  };
}

export function chatSupportResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

export function chatTokenAdapter({ data }) {
  if (!data) return null;

  const fullName = `${data.name.message} ${data.surname.message}`;

  return {
    type: data.role?.message,
    email: data.email.message,
    fullName,
    phoneNumber: data.phone.message,
    companyName: data.company.message,
    registrationCityId: data.location.cityId,
  };
}

export function chatTokenResponseAdapter({ data }) {
  if (!data) return null;

  return { chatId: data.chatId, connected: true, ...tokenAdapter({ data: data.token }) };
}
