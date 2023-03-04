export const categoryAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, code } = attributes;

  return {
    id,
    title,
    code,
  };
};

export const categoriesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((category) => {
    return categoryAdapter({ data: category });
  });
};
