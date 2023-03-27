export const singleTypeAdapter = ({ data }) => {
  if (data === null || data === undefined) return null;
  console.log({ data });
  const { id, name, codeISO3 } = data;
  return {
    countryId: id,
    countryName: name,
    countryCode: codeISO3.toLowerCase(),
  };
};
