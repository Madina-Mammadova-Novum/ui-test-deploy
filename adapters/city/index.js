export const cityAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, name } = data;

  return {
    cityId: id,
    cityName: name,
  };
};

export const citiesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((city) => {
    return cityAdapter({ data: city });
  });
};
