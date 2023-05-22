import { categoryAdapter } from '@/adapters/category';

export const faqAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { question, category, answer, questionType } = attributes;

  return {
    id,
    question,
    questionType: categoryAdapter(questionType),
    category: categoryAdapter(category),
    answer: answer === null ? '' : answer,
  };
};

export const faqsAdapter = ({ data }) => {
  if (data === null) return [];
  return data
    .filter(({ attributes }) => attributes.category.data !== null)
    .map((faq) => {
      return faqAdapter({ data: faq });
    });
};

export const faqsByTypeAdapter = ({ data }, categoryId) => {
  if (data === null) return [];
  return data.filter(({ category, questionType }) => category.id === categoryId && questionType !== null);
};
