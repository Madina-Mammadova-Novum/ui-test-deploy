export const authorPositionAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title } = attributes;
  return {
    id,
    title,
  };
};

export const authorPositionsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((authorPosition) => {
    return authorPositionAdapter({ data: authorPosition });
  });
};
