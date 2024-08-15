export const addToSavedSearchAdapter = ({ data }) => {
  if (!data) return {};

  const { dischargeTerminal, loadTerminal, searchName, cargoType, laycanStart, laycanEnd, products } = data;

  const cargoes = products.map((product) => ({
    productId: product.product.value,
    referenceDensity: product.density,
    quantity: product.quantity,
    tolerance: product.tolerance,
  }));

  return {
    dischargeTerminalId: dischargeTerminal.value,
    loadTerminalId: loadTerminal.value,
    name: searchName,
    cargoTypeId: cargoType.value,
    cargoes,
    laycanStart: new Date(laycanStart),
    laycanEnd: new Date(laycanEnd),
  };
};
