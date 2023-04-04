export const categoryAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, slug, content, shortDescription, coverImage } = attributes;

  return {
    id,
    title,
    slug,
    content,
    shortDescription,
    coverImage,
  };
};

export const categoriesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((category) => {
    return categoryAdapter({ data: category });
  });
};
