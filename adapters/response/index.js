export const responseAdapter = (data) => {
  if (!data) {
    return { data: null };
  }
  if ('data' in data) {
    return {
      data: data.data
    };
  }
  return { data };
};
