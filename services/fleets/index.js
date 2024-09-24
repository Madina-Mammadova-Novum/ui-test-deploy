import { requestFleetNameAdapter } from '@/adapters';
import { getData, postData } from '@/utils/dataFetching';

export async function createFleet({ data }) {
  const body = requestFleetNameAdapter({ data });
  const response = await postData(`fleets/create`, body);
  if (!response.error) response.message = 'You have successfully created a new fleet';
  return {
    ...response,
  };
}

export async function editFleet({ data, fleetId }) {
  const body = requestFleetNameAdapter({ data });
  const response = await postData(`fleets/edit/${fleetId}`, body);
  if (!response.error) response.message = 'You have successfully edited the fleet';
  return {
    ...response,
  };
}

export async function deleteFleet({ fleetId }) {
  const response = await postData(`fleets/delete/${fleetId}`);
  if (!response.error) response.message = 'You have successfully deleted the fleet';
  if (response.error) response.error.title = 'You cannot delete this fleet';
  return {
    ...response,
  };
}

export async function getFleetById({ fleetId }) {
  const response = await getData(`fleets/info/${fleetId}`);
  return {
    ...response,
  };
}
