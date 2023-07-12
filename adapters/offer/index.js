import { postProductsAdapter } from '@/adapters';

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

export function responseSendOfferAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function declineOfferAdapter({ data }) {
  if (!data) return null;

  return data;
}

export function acceptOfferAdapter({ data }) {
  if (!data) return null;

  return data;
}
