export const cargoTypeAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];
  const { id, name } = data;
  return {
    id,
    name,
  };
};

export const cargoTypesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((port) => {
    return cargoTypeAdapter({ data: port });
  });
};
