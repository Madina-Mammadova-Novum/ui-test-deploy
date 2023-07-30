export const notificationsAdapter = ({ data }) => {
  if (!data) return null;

  return {
    query: '',
    origin: '',
    isOpened: data?.opened,
    createdAt: data?.created,
    skip: data?.page,
    take: data?.perPage,
  };
};
