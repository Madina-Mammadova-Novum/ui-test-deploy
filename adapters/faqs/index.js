import { categoryAdapter } from '@/adapters/category';

export const faqAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { question, category, answer } = attributes;

  return {
    id,
    question,
    category: categoryAdapter(category),
    answer,
  };
};

export const faqsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((faq) => {
    return faqAdapter({ data: faq });
  });
};
