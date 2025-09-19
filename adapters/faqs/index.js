export const faqsByTypeAdapter = ({ data }, categoryId) => {
  if (data === null) return [];
  return data.filter(({ category, questionType }) => category.id === categoryId && questionType !== null);
};
