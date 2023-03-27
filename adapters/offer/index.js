export function sendOfferAdapter({ data }) {
  const placeholder = 'placeholder';
  if (data === null) return null;
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
    products: products.map(({ density, quantity }) => ({
      productId: placeholder,
      density,
      quantity,
    })),
  };
}
