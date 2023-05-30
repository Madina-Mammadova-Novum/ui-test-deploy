import { postProductsAdapter } from '@/adapters';

export function sendOfferAdapter({ data }) {
  const placeholder = 'placeholder';
  if (!data) return null;
  const { demurrageRate, freight, layTime, paymentTerms, products, undisputedDemurrage, value, cargoType, nor } = data;

  return {
    cargoType: placeholder || cargoType,
    demurrageRate,
    freight: freight.value,
    layTime,
    nor: placeholder || nor,
    paymentTerms: paymentTerms.value,
    undisputedDemurrage: undisputedDemurrage.value,
    value,
    products: postProductsAdapter({ data: products }),
  };
}

export function declineOfferAdapter({ data }) {
  if (!data) return null;

  return data;
}

export function acceptOfferAdapter({ data }) {
  if (!data) return null;

  return data;
}
