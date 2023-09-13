import { getSession } from 'next-auth/react';

import { transformDate } from '@/utils/date';
import { clientIdentification, extractTime } from '@/utils/helpers';

export function chatSessionResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

function chatSessionDataAdapter({ data }) {
  if (!data) return {};

  const { id } = data;

  return {
    chatId: id,
  };
}

function chatDealDataAdapter({ data }) {
  if (!data) return {};

  const { searchedCargo, products, vessel } = data;

  return {
    vessel: {
      name: vessel?.details?.name?.toLowerCase(),
      imo: vessel?.imo?.toLowerCase(),
      type: searchedCargo?.cargoType?.toLowerCase(),
      cargoId: searchedCargo?.code,
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
      products: products?.map((product) => ({ id: product?.id, name: product?.productName })),
      laycanStart: transformDate(searchedCargo?.laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(searchedCargo?.laycanEnd, 'MMM dd, yyyy'),
    },
  };
}

export function listOfChatsDataAdapter({ data }) {
  if (!data) return [];

  return data.map(({ chat, deal }) => ({
    ...chatSessionDataAdapter({ data: chat }),
    ...chatDealDataAdapter({ data: deal }),
  }));
}

export async function messageResponseAdapter({ data }) {
  if (!data) return {};

  const session = await getSession();

  const { body, senderId, createdAt, id } = data;

  return {
    id,
    sender: clientIdentification({ senderId, clientId: session?.userId }),
    time: extractTime(createdAt),
    message: body,
  };
}
