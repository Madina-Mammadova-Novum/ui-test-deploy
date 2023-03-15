export const portAdapter = (data = []) => {
  // todo: create similar structure with other adapters
  return data?.map(({ portId, name }) => ({ id: portId ?? '', value: name ?? '', label: name ?? '' }));
};
