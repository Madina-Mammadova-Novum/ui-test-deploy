export const countryOptionAdapter = (data) => {
  if (data === null) return null;

  const { id, countryId, label, countryFlag, countryName, countryCode } = data;

  return {
    value: id || countryId,
    label: label || countryName,
    countryFlag: countryFlag || countryCode,
  };
};

export const countryOptionsAdapter = ({ data }) => {
  if (data === null) return [];
  return data?.map((option) => {
    return countryOptionAdapter(option);
  });
};
