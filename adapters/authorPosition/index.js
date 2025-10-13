export const authorPositionAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title } = attributes;
  return {
    id,
    title,
  };
};
