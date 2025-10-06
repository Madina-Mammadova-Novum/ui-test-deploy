import { faqsAdapter } from '@/adapters/faqs';
import { getData } from '@/utils/dataFetching';

export const getFAQs = async () => {
  const response = await getData(`collection-type/faq-questions`);
  return {
    ...response,
    data: faqsAdapter(response),
  };
};
