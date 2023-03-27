export function searchVesselAdapter({ data }) {
  if (data === null) return null;
  const { laycanStart, laycanEnd, cargoType, dischargeTerminal, loadTerminal, products, dischargePort, loadPort } =
    data;

  return {
    dischargePort,
    loadPort,
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    cargoTypeId: cargoType.value,
    laycanStart,
    laycanEnd,
    cargoes: products.map(({ product, density, quantity, tolerance }) => ({
      productId: product.value,
      referenceDensity: density,
      quantity,
      tolerance,
    })),
  };
}
