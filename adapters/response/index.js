export const responseAdapter = (data) => {
  const { data: responseData } = data || {};
  return { data: responseData };
};
