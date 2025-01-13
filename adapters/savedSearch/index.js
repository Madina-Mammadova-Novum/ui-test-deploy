import { countriesReverseAdapter } from '@/adapters/country';

export const addToSavedSearchAdapter = ({ data }) => {
  if (!data) return {};

  const {
    dischargeTerminal,
    loadTerminal,
    searchName,
    cargoType,
    laycanStart,
    laycanEnd,
    products,
    isNotification,
    additionalDischargeOptions,
    sanctionedCountries = [],
    excludeInternationallySanctioned,
  } = data;

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
    additionalDischargeOptions,
    sanctionedCountries: countriesReverseAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
};

export const updateSavedSearchAdapter = ({ data }) => {
  if (!data) return {};

  const {
    dischargeTerminal,
    loadTerminal,
    name,
    cargoType,
    laycanStart,
    laycanEnd,
    cargoes,
    isNotification,
    additionalDischargeOptions,
    sanctionedCountries,
    excludeInternationallySanctioned,
  } = data;

  return {
    dischargeTerminalId: dischargeTerminal.id,
    loadTerminalId: loadTerminal.id,
    name,
    isNotification,
    cargoTypeId: cargoType.id,
    cargoes,
    laycanStart,
    laycanEnd,
    additionalDischargeOptions,
    sanctionedCountries,
    excludeInternationallySanctioned,
  };
};
