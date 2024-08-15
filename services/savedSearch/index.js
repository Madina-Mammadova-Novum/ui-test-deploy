import { addToSavedSearchAdapter } from '@/adapters/savedSearch';
import { postData } from '@/utils/dataFetching';

export async function addToSavedSearch({ data }) {
  const body = addToSavedSearchAdapter({ data });
  const response = await postData(`vessels/add-savedsearched`, body);
  if (!response.error) response.message = 'The search has been successfully saved.';
  return {
    ...response,
  };
}
