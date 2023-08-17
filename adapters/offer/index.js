import { postProductsAdapter } from '@/adapters';
import { transformDate } from '@/utils/date';
import { extractTimeFromDate } from '@/utils/helpers';

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
    totalAmount,
    // nor,
  } = data;
  return {
    laycanStart,
    laycanEnd,
    comment,
    cargoTypeId: cargoType.value,
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    vesselId: tankerId,
    freightFormatId: freight.value,
    mt: value,
    totalAmount: +totalAmount.toFixed(0),
    minOfferQuantity,
    demurrageRate,
    laytime: layTime,
    demurragePaymentTermId: undisputedDemurrage.value,
    paymentTermId: paymentTerms.value,
    countDownTimerSettingId: responseCountdown.value,
    cargoes: postProductsAdapter({ data: products }),
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
  };
}

export function responseSendOfferAdapter({ data }) {
  if (!data) return null;
  return data;
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

export function offerDetailsAdapter({ data }) {
  if (!data) return null;
  const {
    laycanStart,
    laycanEnd,
    searchedCargo: { loadTerminal, dischargeTerminal, cargoType } = {},
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
            label: `${loadTerminal?.port?.name}${loadTerminal?.port?.locode && `, ${loadTerminal?.port?.locode}`}`,
            countryCode: 'us',
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
            countryCode: 'us',
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
          label: cargoType,
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
          label: freight,
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
          label: demurragePaymentTerm,
        },
        {
          key: 'Payment terms',
          label: paymentTerm,
        },
      ],
    },

    comments: comments?.map(({ comment, createdAt }) => ({
      title: comment,
      date: transformDate(createdAt, 'MMM dd, yyyy'),
      time: extractTimeFromDate(createdAt),
    })),

    counterofferData: {
      offerId,
      tankerId,
      loadPortId: loadTerminal?.port?.id,
      dischargePortId: dischargeTerminal?.port?.id,
      cargoType: {
        label: cargoType,
        value: 'NEEDS_DATA_FROM_BACKEND',
      },
      products: products?.map(({ productName, density, minQuantity, tolerance, id }) => ({
        product: { label: productName, value: id },
        density,
        tolerance,
        quantity: minQuantity,
      })),
    },
    failedOfferData: {
      isFailed,
      failureReason,
    },
  };
}

export function confirmCounterofferDetailsAdapter({ data }) {
  if (!data) return null;
  const { cargoType, products, freight, demurrageRate, layTime, undisputedDemurrage, paymentTerms, comment } = data;

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
          label: freight?.label,
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
