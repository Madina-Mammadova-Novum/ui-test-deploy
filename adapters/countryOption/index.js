export const countryOptionAdapter = (data) => {
  if (!data) return {};

  const { id, countryId, label, countryFlag, countryName, countryCode, coordinates } = data;

  return {
    value: id || countryId,
    label: label || countryName,
    countryFlag: countryFlag || countryCode,
    coordinates: [coordinates?.longtitude, coordinates?.latitude],
  };
};

export const countryOptionsAdapter = ({ data }) => {
  if (!data) return [];

  return data?.map((option) => countryOptionAdapter(option));
};
