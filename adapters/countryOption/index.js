export const countryOptionAdapter = (data) => {
  if (!data) return {};

  const { id, countryId, label, countryFlag, countryName, countryCode } = data;

  return {
    value: id || countryId,
    label: label || countryName,
    countryFlag: countryFlag || countryCode,
  };
};

export const countryOptionsAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((option) => {
    return countryOptionAdapter(option);
  });
};
