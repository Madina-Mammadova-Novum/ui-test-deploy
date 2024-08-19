import { addToSavedSearchAdapter } from '@/adapters/savedSearch';
import { deleteData, getData, postData } from '@/utils/dataFetching';

export async function addToSavedSearch({ data }) {
  const body = addToSavedSearchAdapter({ data });
  const response = await postData(`saved-searches/add-saved-search`, body);

  if (!response.error) response.message = 'The search has been successfully saved.';

  return {
    ...response,
  };
}

export async function getSavedSearches({ skip = 1, pageSize = 2, sortColumnDirection = 'asc', query = '' }) {
  const response = await getData(
    `saved-searches?skip=${skip}&pageSize=${pageSize}&sortColumnDirection=${sortColumnDirection}${query && `&query=${query}`}`
  );

  return {
    ...response,
  };
}

export const deleteSavedSearch = async ({ searchId }) => {
  const response = await deleteData(`saved-searches/${searchId}/delete-search`);

  if (!response.error) response.message = 'The search has been successfully deleted.';

  return {
    ...response,
  };
};
