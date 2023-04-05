export const singleTypeAdapter = ({ data }) => {
  if (data === null || data === undefined) return null;
  const { id, attributes } = data;
  const { title, subTitle, shortDescription } = attributes;
  return {
    ...attributes,
    id,
    title,
    subTitle,
    shortDescription,
  };
};
