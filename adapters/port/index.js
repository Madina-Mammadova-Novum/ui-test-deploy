export const portAdapter = ({ data }) => {
  if (data === null) return [];
  // todo: create similar structure with other adapters
  return data?.map(({ terminals = [] }) =>
    terminals?.map(({ portId, name }) => ({
      id: portId ?? '',
      value: name ?? '',
      label: name ?? '',
    }))
  );
};
