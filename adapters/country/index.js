export const countryAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, name, codeISO3 } = data;
  return {
    countryId: id,
    countryName: name,
    countryCode: codeISO3.toLowerCase(),
  };
};

export const countriesAdapter = ({ data }) => {
  if (data === null) return [];
  return data?.map((country) => {
    // todo: extend condition in 12 line with this condition
    return countryAdapter({ data: country });
  });
};
