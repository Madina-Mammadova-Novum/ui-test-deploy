export function getGeneralDataAdapter({ data }) {
  return {
    countires: data.general.data.countries,
    ports: data.general.data.ports,
  };
}
