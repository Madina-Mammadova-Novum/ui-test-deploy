import { requestFleetNameAdapter } from '@/adapters';
import { postData } from '@/utils/dataFetching';

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
  return {
    ...response,
  };
}
