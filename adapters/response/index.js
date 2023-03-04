export const responseAdapter = (data) => {
  if (data === null) return null;
  if ('data' in data) return data;
  return {
    data,
  };
};
