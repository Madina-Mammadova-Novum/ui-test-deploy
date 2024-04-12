import { postProductsAdapter } from '@/adapters';
import { transformDate } from '@/utils/date';
import {
  addLocalDateFlag,
  calculateCountdown,
  extractTimeFromDate,
  freightFormatter,
  getAppropriateFailedBy,
  getLocode,
  getOfferTotalMinQuantity,
  getRoleIdentity,
} from '@/utils/helpers';

export function sendOfferAdapter({ data }) {
  if (!data) return null;
  const {
    laycanStart,
    laycanEnd,
    comment,
    cargoType,
    loadTerminal,
    dischargeTerminal,
    tankerId,
    freight,
    demurrageRate,
    layTime,
    undisputedDemurrage,
    paymentTerms,
    products,
    responseCountdown,
    value,
    minOfferQuantity,
    ballastLeg,
    estimatedArrivalTime,
  } = data;
  return {
    laycanStart,
    laycanEnd,
    comment,
    cargoTypeId: cargoType.value,
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    vesselId: tankerId,
    estimatedArrivalTime,
    ballastLeg,
    freightFormatId: freight.value,
    freight: value,
    minOfferQuantity,
    demurrageRate,
    laytime: layTime,
    demurragePaymentTermId: undisputedDemurrage.value,
    paymentTermId: paymentTerms.value,
    countDownTimerSettingId: responseCountdown.value,
    cargoes: postProductsAdapter({ data: products }),
  };
}

// {
//   "laycanStart": "2024-03-07T17:24:55.536Z",
//   "laycanEnd": "2024-03-07T17:24:55.536Z",
//   "comment": "string",
//   "cargoTypeId": "string",
//   "loadTerminalId": "string",
//   "dischargeTerminalId": "string",
//   "vesselId": "string",
//   "estimatedArrivalTime": "2024-03-07T17:24:55.536Z",
//   "ballastLeg": "string",
//   "freightFormatId": "string",
//   "freight": 0,
//   "minOfferQuantity": 0,
//   "demurrageRate": 0,
//   "laytime": 100,
//   "demurragePaymentTermId": "string",
//   "paymentTermId": "string",
//   "countDownTimerSettingId": "string",
//   "cargoes": [
//     {
//       "productId": "string",
//       "referenceDensity": 0,
//       "quantity": 0,
//       "tolerance": 20
//     }
//   ]
// }

export function sendCounterofferAdapter({ data }) {
  if (!data) return null;
  const {
    offerId,
    undisputedDemurrage,
    paymentTerms,
    layTime,
    value,
    demurrageRate,
    responseCountdown,
    comment,
    freight,
    products,
  } = data;

  return {
    dealId: offerId,
    demurragePaymentTermId: undisputedDemurrage?.value,
    paymentTermId: paymentTerms?.value,
    layTime,
    freight: value,
    demurrageRate,
    comment,
    freightFormatId: freight?.value,
    countDownTimerSettingId: responseCountdown?.value,
    cargoes: products.map(({ density, product: { value: productId }, quantity }, index) => ({
      productId,
      referenceDensity: +density,
      quantity: +quantity,
      tolerance: data[`products[${index}].tolerance`],
    })),
  };
}

export function responseSendOfferAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function sendOfferValidationAdapter({ data }) {
  const minOfferQuantity = getOfferTotalMinQuantity({ data: data?.products });

  return {
    minOfferQuantity,
    vesselId: data?.tankerId,
    laycanStart: data?.laycanStart,
    laycanEnd: data?.laycanEnd,
    cargoTypeId: data?.cargoType?.value,
    loadTerminalId: data?.loadTerminal?.value,
    dischargeTerminalId: data?.dischargeTerminal?.value,
    cargoes: data?.products?.map((item) => ({
      productId: item?.product?.value,
      quantity: item?.quantity,
      referenceDensity: item?.density,
      tolerance: item?.tolerance,
    })),
  };
}

export function sendCounterOfferValidationAdapter(dealId) {
  return { dealId };
}

export function declineOfferAdapter({ data }) {
  if (!data) return null;
  const { reason, offerId } = data;

  return {
    reason,
    dealId: offerId,
  };
}

export function responseDeclineOfferAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function acceptOfferAdapter({ data }) {
  if (!data) return null;
  const { offerId, comment } = data;

  return {
    dealId: offerId,
    comment,
  };
}

export function responseAcceptOfferAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function responseOfferDetailsAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function responseSendCounterofferAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function offerDetailsAdapter({ data, role }) {
  if (!data) return null;

  const {
    laycanStart,
    laycanEnd,
    searchedCargo: { loadTerminal, dischargeTerminal, cargoType: { name: cargoName, id: cargoId } = {} } = {},
    products,
    freight,
    demurrageRate,
    layTime,
    paymentTerm,
    demurragePaymentTerm,
    comments,
    vessel: { id: tankerId } = {},
    id: offerId,
    isFailed,
    failureReason,
    failedBy,
    expiresAt,
    frozenAt,
    freightFormat,
    isCountdownExtendedByOwner,
    isCountdownExtendedByCharterer,
    isCountdownActive,
  } = data;

  const { isOwner } = getRoleIdentity({ role });

  const allowExtensionByRole = isOwner ? !isCountdownExtendedByOwner : !isCountdownExtendedByCharterer;

  return {
    allowExtension: allowExtensionByRole,
    isCountdownActive,
    countdownData: {
      date: calculateCountdown(expiresAt, frozenAt),
      autoStart: !frozenAt,
    },
    voyageDetails: {
      dates: [
        [
          {
            key: 'Laycan start',
            label: transformDate(laycanStart, 'MMM dd, yyyy'),
          },
          {
            key: 'Laycan end',
            label: transformDate(laycanEnd, 'MMM dd, yyyy'),
          },
        ],
      ],
      ports: [
        [
          {
            key: 'Load port',
            label: `${loadTerminal?.port?.name}${loadTerminal?.port?.locode && `, ${loadTerminal?.port?.locode}`}`,
            countryCode: getLocode(loadTerminal?.port?.locode),
          },
          {
            key: 'Load terminal',
            label: loadTerminal?.name,
          },
        ],
        [
          {
            key: 'Discharge port',
            label: `${dischargeTerminal?.port?.name}${
              dischargeTerminal?.port?.locode && `, ${dischargeTerminal?.port?.locode}`
            }`,
            countryCode: getLocode(dischargeTerminal?.port?.locode),
            id: dischargeTerminal?.port?.countryId,
          },
          {
            key: 'Discharge terminal',
            label: dischargeTerminal?.name,
          },
        ],
      ],
    },

    commercialOfferTerms: {
      cargo: [
        {
          key: 'Cargo Type',
          label: cargoName,
        },
      ],
      products: products?.map(({ productName, density, minQuantity }, index) => [
        {
          key: `Product #${index + 1}`,
          label: productName,
        },
        {
          key: 'Density',
          label: `${density} mt/m3`,
        },
        {
          key: 'Min quantity',
          label: `${minQuantity} tons`,
        },
      ]),
      details: [
        {
          key: 'Freight',
          label: freightFormatter({ format: freightFormat?.value, value: freight }),
        },
        {
          key: 'Demurrage rate',
          label: `$${demurrageRate} per day`,
        },
        {
          key: 'Laytime + NOR',
          label: `${layTime} hrs + (6 + 6 hrs)`,
        },
        {
          key: 'Undisputed demurrage payment terms',
          label: demurragePaymentTerm?.name,
        },
        {
          key: 'Payment terms',
          label: paymentTerm?.name,
        },
      ],
    },

    comments: comments?.map(({ comment, createdAt }) => {
      const localDateFormat = addLocalDateFlag(createdAt);
      return {
        title: comment,
        date: transformDate(localDateFormat, 'MMM dd, yyyy'),
        time: extractTimeFromDate(localDateFormat),
      };
    }),

    counterofferData: {
      offerId,
      tankerId,
      loadPortId: loadTerminal?.port?.id,
      dischargePortId: dischargeTerminal?.port?.id,
      cargoType: {
        label: cargoName,
        value: cargoId,
      },
      products: products?.map(({ productName, density, minQuantity, tolerance, id }) => ({
        product: { label: productName, value: id },
        density,
        tolerance,
        quantity: minQuantity,
      })),
      value: freight,
      demurrageRate,
      layTime,
      undisputedDemurrage: {
        label: demurragePaymentTerm?.name,
        value: demurragePaymentTerm?.id,
      },
      paymentTerms: {
        label: paymentTerm?.name,
        value: paymentTerm?.id,
      },
      freight: {
        label: freightFormat?.value,
        value: freightFormat?.id,
      },
    },
    failedOfferData: {
      isFailed,
      failureReason,
      declinedBy: getAppropriateFailedBy({ failedBy, role }),
    },
  };
}

export function voyageDetailsAdapter({ data }) {
  if (!data) return null;
  const { laycanStart, laycanEnd, loadPort, loadTerminal, dischargePort, dischargeTerminal } = data;

  return {
    voyageDetails: {
      dates: [
        [
          {
            key: 'Laycan start',
            label: transformDate(laycanStart, 'MMM dd, yyyy'),
          },
          {
            key: 'Laycan end',
            label: transformDate(laycanEnd, 'MMM dd, yyyy'),
          },
        ],
      ],
      ports: [
        [
          {
            key: 'Load port',
            label: loadPort?.label,
            countryCode: loadPort?.countryFlag,
          },
          {
            key: 'Load terminal',
            label: loadTerminal?.label,
          },
        ],
        [
          {
            key: 'Discharge port',
            label: dischargePort?.label,
            countryCode: dischargePort?.countryFlag,
          },
          {
            key: 'Discharge terminal',
            label: dischargeTerminal?.label,
          },
        ],
      ],
    },
  };
}

export function confirmCounterofferDetailsAdapter({ data }) {
  if (!data) return null;
  const { cargoType, products, freight, demurrageRate, layTime, undisputedDemurrage, paymentTerms, comment, value } =
    data;

  return {
    commercialOfferTerms: {
      cargo: [
        {
          key: 'Cargo Type',
          label: cargoType?.label,
        },
      ],
      products: products?.map(({ product, density, quantity }, index) => [
        {
          key: `Product #${index + 1}`,
          label: product?.label,
        },
        {
          key: 'Density',
          label: `${density} mt/m3`,
        },
        {
          key: 'Min quantity',
          label: `${quantity} tons`,
        },
      ]),
      details: [
        {
          key: 'Freight',
          label: freightFormatter({ format: freight?.label, value }),
        },
        {
          key: 'Demurrage rate',
          label: `$${demurrageRate} per day`,
        },
        {
          key: 'Laytime + NOR',
          label: `${layTime} hrs + (6 + 6 hrs)`,
        },
        {
          key: 'Undisputed demurrage payment terms',
          label: undisputedDemurrage?.label,
        },
        {
          key: 'Payment terms',
          label: paymentTerms?.label,
        },
      ],
    },
    comment: {
      title: comment,
      date: transformDate(new Date(), 'MMM dd, yyyy'),
      time: extractTimeFromDate(new Date()),
    },
  };
}

export const requestExtendCountdownAdapter = ({ data }) => {
  if (!data) return [];
  return {
    dealId: data,
  };
};

export const responseExtendCountdownAdapter = ({ data }) => {
  if (!data) return {};
  return data;
};

export const requestOnSubsCountdownExtensionAdapter = ({ data }) => {
  if (!data) return [];
  const { option, offerId } = data;
  return {
    dealId: offerId,
    minutes: option?.value,
  };
};

export const responseOnSubsCountdownExtensionAdapter = ({ data }) => {
  if (!data) return {};
  return data;
};

export const getPrefilledFormDataAdapter = ({ data }) => {
  if (!data) return [];

  return data
    ?.filter((product) => product)
    ?.reduce((res, curr, index) => {
      res[`products[${index}].product`] = curr.product;
      res[`products[${index}].density`] = curr.density;
      res[`products[${index}].tolerance`] = curr.tolerance;
      res[`products[${index}].quantity`] = curr.quantity * (1 - curr.tolerance / 100);

      return res;
    }, {});
};
