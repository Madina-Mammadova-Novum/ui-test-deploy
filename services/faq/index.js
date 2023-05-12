import { faqAdapter, faqsAdapter } from '@/adapters/faqs';
import { getData } from '@/utils/dataFetching';

export const getFAQ = async (faqId) => {
  const response = await getData(`collection-type/faq-questions/${faqId}`);
  return {
    ...response,
    data: faqAdapter(response),
  };
};

export const getFAQs = async () => {
  const response = await getData(`collection-type/faq-questions`);
  return {
    ...response,
    data: faqsAdapter(response),
  };
};
