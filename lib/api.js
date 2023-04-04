export const authorization = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
