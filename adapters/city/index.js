export const cityAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, name, state } = data;
  const { name: stateName } = state;

  return {
    cityId: id,
    cityName: `${name}, ${stateName}`,
  };
};

export const citiesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((city) => {
    return cityAdapter({ data: city });
  });
};
