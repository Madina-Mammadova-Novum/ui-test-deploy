import { authorAdapter, authorsAdapter } from '@/adapters/author';
import { getData } from '@/utils/dataFetching';

export const getAuthor = async (authorId) => {
  const response = await getData(`collection-type/authors/${authorId}`);
  return {
    ...response,
    data: authorAdapter(response),
  };
};

export const getAuthors = async () => {
  const response = await getData(`collection-type/authors`);
  return {
    ...response,
    data: authorsAdapter(response),
  };
};
