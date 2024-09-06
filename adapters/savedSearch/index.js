export const addToSavedSearchAdapter = ({ data }) => {
  if (!data) return {};

  const { dischargeTerminal, loadTerminal, searchName, cargoType, laycanStart, laycanEnd, products, isNotification } =
    data;

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
    isNotification,
    cargoTypeId: cargoType.value,
    cargoes,
    laycanStart: new Date(laycanStart),
    laycanEnd: new Date(laycanEnd),
  };
};

export const updateSavedSearchAdapter = ({ data }) => {
  if (!data) return {};

  const { dischargeTerminal, loadTerminal, name, cargoType, laycanStart, laycanEnd, cargoes, isNotification } = data;

  return {
    dischargeTerminalId: dischargeTerminal.id,
    loadTerminalId: loadTerminal.id,
    name,
    isNotification,
    cargoTypeId: cargoType.id,
    cargoes,
    laycanStart,
    laycanEnd,
  };
};
