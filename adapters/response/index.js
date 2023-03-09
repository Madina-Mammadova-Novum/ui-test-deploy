export const responseAdapter = (data) => {
  console.log('data: ', data);
  if (data === null) return null;
  if ('data' in data) return data;
  return {
    data,
  };
};
