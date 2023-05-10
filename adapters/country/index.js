export const countryAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, name, codeISO3, codeISO2 } = data;
  if (name === null) return null;
  const commonCode = codeISO2 === null ? codeISO3 : codeISO2;
  const code = commonCode === null ? name.substring(0, 3) : commonCode;
  return {
    countryId: id,
    countryName: name,
    countryCode: code.toLowerCase(),
  };
};

export const countriesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((country) => {
    return countryAdapter({ data: country });
  });
};
