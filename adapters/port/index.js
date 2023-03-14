export const portAdapter = (data = []) => {
  return data?.map(({ portId, name }) => ({ id: portId ?? '', value: name ?? '', label: name ?? '' }));
};
