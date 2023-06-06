import { requestFleetNameAdapter } from '@/adapters';
import { postData } from '@/utils/dataFetching';

export async function createFleet({ data }) {
  const body = requestFleetNameAdapter({ data });
  const response = await postData(`fleets/create`, body);
  return {
    ...response,
  };
}

export async function editFleet({ data, fleetId }) {
  const body = requestFleetNameAdapter({ data });
  const response = await postData(`fleets/edit/${fleetId}`, body);
  return {
    ...response,
  };
}

export async function deleteFleet({ fleetId }) {
  const response = await postData(`fleets/delete/${fleetId}`);
  return {
    ...response,
  };
}
