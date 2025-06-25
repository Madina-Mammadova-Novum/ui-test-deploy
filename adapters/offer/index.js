import { postProductsAdapter } from '@/adapters';
import { nullAdapter, objectAdapter } from '@/adapters/common';
import { countriesAdapter, countriesReverseAdapter } from '@/adapters/country';
import { transformDate } from '@/utils/date';
import {
  addLocalDateFlag,
  calculateCountdown,
  formatCurrency,
  freightFormatter,
  getAppropriateFailedBy,
  getLocode,
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
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
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
    additionalDischargeOptions,
    sanctionedCountries: countriesReverseAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
}

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
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
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
    additionalDischargeOptions,
    sanctionedCountries: countriesReverseAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
}

export function responseSendOfferAdapter({ data }) {
  return nullAdapter(data);
}

export function sendOfferValidationAdapter({ data }) {
  if (!data) return null;

  return {
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
  return nullAdapter(data);
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
  return nullAdapter(data);
}

export function responseOfferDetailsAdapter({ data }) {
  return nullAdapter(data);
}

export function responseSendCounterofferAdapter({ data }) {
  return nullAdapter(data);
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
    hasUnreadComment,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;

  const { isOwner } = getRoleIdentity({ role });

  const allowExtensionByRole = isOwner ? !isCountdownExtendedByOwner : !isCountdownExtendedByCharterer;

  return {
    allowExtension: allowExtensionByRole,
    hasUnreadComment,
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
      additionalDischargeOptions,
      sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
      excludeInternationallySanctioned,
    },

    commercialOfferTerms: {
      cargo: [
        {
          key: 'Cargo Type',
          label: cargoName,
        },
      ],
      products: products?.map(({ productName, density, quantity }, index) => [
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
          label: `${quantity} tons`,
        },
      ]),
      details: [
        {
          key: 'Freight',
          label: freightFormatter({ format: freightFormat?.value, value: freight }),
        },
        {
          key: 'Demurrage rate',
          label: `$${formatCurrency(demurrageRate)} per day`,
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

    comments: comments?.map(({ comment, createdAt, sentBy }) => {
      const localDateFormat = addLocalDateFlag(createdAt);
      return {
        title: comment,
        date: transformDate(localDateFormat, 'MMM dd, yyyy'),
        time: localDateFormat,
        sentBy,
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
      products: products?.map(({ productName, density, quantity, tolerance, id }) => ({
        product: { label: productName, value: id },
        density,
        tolerance,
        quantity,
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

export function voyageDetailsAdapter({ data, laycanStart, laycanEnd }) {
  if (!data) return null;
  const {
    loadPort,
    loadTerminal,
    dischargePort,
    dischargeTerminal,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;

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
      additionalDischargeOptions,
      // sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
      sanctionedCountries,
      excludeInternationallySanctioned,
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
          label: `$${formatCurrency(demurrageRate)} per day`,
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
      time: '',
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
  return objectAdapter(data);
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
  return objectAdapter(data);
};

export const getPrefilledFormDataAdapter = ({ data }) => {
  if (!data) return [];

  return data
    ?.filter((product) => product)
    ?.reduce((res, curr, index) => {
      res[`products[${index}].product`] = curr.product;
      res[`products[${index}].density`] = curr.density;
      res[`products[${index}].tolerance`] = curr.tolerance;
      res[`products[${index}].quantity`] = curr.quantity;
      res[`products[${index}].minQuantity`] = curr.quantity;

      return res;
    }, {});
};
