import { postProductsAdapter } from '@/adapters';

export function searchVesselAdapter({ data }) {
  if (data === null) return null;
  const {
    laycanStart,
    laycanEnd,
    cargoType,
    dischargeTerminal,
    loadTerminal,
    products,
    // dischargePort,
    // loadPort
  } = data;

  return {
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    cargoTypeId: cargoType.value,
    laycanStart,
    laycanEnd,
    cargoes: postProductsAdapter({ data: products }),
  };
}
