import { addToSavedSearchAdapter, updateSavedSearchAdapter } from '@/adapters/savedSearch';
import { deleteData, getData, postData, putData } from '@/utils/dataFetching';

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

export const getSavedSearchDetail = async ({ searchId }) => {
  const response = await getData(`saved-searches/${searchId}/detail`);

  return {
    ...response,
  };
};

export async function updateSavedSearch({ searchId, data }) {
  const body = updateSavedSearchAdapter({ data });

  const response = await putData(`saved-searches/${searchId}/update-search`, body);

  if (!response.error) {
    response.message = 'Notification updated successfully';
    response.messageDescription = 'The notification content for your search has been updated successfully.';
  }
  return {
    ...response,
  };
}
