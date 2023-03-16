const singularPortAdapter = ({ data }) => {
  if (data === null) return null;

  const { id, name } = data;

  return {
    label: name,
    value: name,
    id,
  };
};

export const portAdapter = ({ data }) => {
  if (data === null) return [];
  // todo: create similar structure with other adapters
  return data?.map((el) => singularPortAdapter({ data: el }));
};
