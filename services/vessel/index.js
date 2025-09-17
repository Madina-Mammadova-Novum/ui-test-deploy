import {
  removeVesselAdapter,
  removeVesselFromFleetAdapter,
  requestAddVesselAdapter,
  requestAddVesselManuallyAdapter,
  requestAddVesselToFleetAdapter,
  requestSearchVesselAdapter,
  requestUpdateVesselAdapter,
  updateVesselPortAndDataAdapter,
} from '@/adapters/vessel';
import { getData, postData, putData } from '@/utils/dataFetching';
import { generateMessageByActionType } from '@/utils/helpers';

export async function searchVessels({ data }) {
  const body = requestSearchVesselAdapter({ data });
  const response = await postData(`vessels/search?sortBy=${data?.sortBy}&rangeBy=${data?.rangeBy}`, body);

  return {
    ...response,
  };
}

export async function addVesselToFleet({ data, fleetId }) {
  const body = requestAddVesselToFleetAdapter({ data });
  const response = await postData(`vessels/add-by-imo/${fleetId}`, body);
  return {
    ...response,
  };
}

export async function getQ88DataByImo({ imo }) {
  const response = await getData(`vessels/get-q88/${imo}`);
  return {
    ...response,
  };
}

export async function addVesselManually({ data, vesselId }) {
  const body = requestAddVesselManuallyAdapter({ data });
  const response = await postData(`vessels/initiate/${vesselId}`, body);

  if (!response.error) {
    response.message = 'Your tanker addition request has been successfully sent.';
    response.messageDescription = 'You will be notified soon.';
  }

  return {
    ...response,
  };
}

export async function requestUpdateVessel({ data }) {
  const body = requestUpdateVesselAdapter({ data });
  const response = await putData(`vessels/update`, body);

  if (!response.error) {
    response.message = 'You have successfully requested to edit tanker information';
    response.messageDescription = 'You will be notified on the decision within 24 hours.';
  }

  return {
    ...response,
  };
}

export async function getVesselTypes() {
  const response = await getData(`vessels/types`);
  return {
    ...response,
  };
}

export async function getVesselCategoryOne(vesselTypeId) {
  const response = await getData(`vessels/category-one/${vesselTypeId}`);
  return {
    ...response,
  };
}

export async function getVesselCategoryTwo(categoryOneId) {
  const response = await getData(`vessels/category-two/${categoryOneId}`);
  return {
    ...response,
  };
}

export async function updateVesselPortAndDate(data) {
  const body = updateVesselPortAndDataAdapter({ data });

  const response = await putData(`account/positions/update-vessel-port`, body);

  if (!response.error) response.message = generateMessageByActionType({ action: data?.action });

  return {
    ...response,
  };
}

export async function getUnassignedVessels() {
  const response = await getData(`vessels/get-unassigned`);

  return {
    ...response,
  };
}

export async function getAssignedVessels({ id, ...rest }) {
  const response = await getData(`vessels/get-assigned/${id}`);

  return {
    id,
    vessels: response?.data || [],
    ...rest,
  };
}

export async function getFleetsVessels(data) {
  return Promise.all(data.map(getAssignedVessels));
}

export async function getVesselDetails(tankerId) {
  const response = await getData(`vessels/details/${tankerId}`);

  return {
    ...response,
  };
}

export async function removeVesselFromFleet(data) {
  const body = removeVesselFromFleetAdapter({ data });

  const response = await postData(`vessels/delete-from-fleet`, body);
  if (!response.error) response.message = `You have successfully removed the tanker from '${data?.fleetName}' fleet.`;

  return {
    ...response,
  };
}
export async function removeVessel(data) {
  const body = removeVesselAdapter({ data });

  const response = await postData(`vessels/delete`, body);
  if (!response.error) response.message = 'You have successfully deleted the tanker';

  return {
    ...response,
  };
}

export async function getVesselNames({ stages = null }) {
  const response = await getData(`account/get-vesselnames${stages ? `?stages=${stages}` : ''}`);

  return {
    ...response,
  };
}

export async function addVessel({ imo, fleetId, q88QuestionnaireFile }) {
  const body = requestAddVesselAdapter({ data: { imo, fleetId, q88QuestionnaireFile } });

  const response = await postData(`vessels/add`, body);

  if (!response.error) {
    response.message = 'Vessel addition request is under review';
    response.messageDescription = `We have received your vessel addition request for IMO: ${imo}. We will conduct a verification of your commercial authority over the vessel, and you will be notified as soon as the process is finalized.`;
  }

  return {
    ...response,
  };
}

export async function updateVesselTankerLink({ vesselId, data }) {
  const response = await putData(`vessels/tankerlink/${vesselId}`, data);

  if (!response.error) {
    response.message = 'Vessel category updated successfully';
  }

  return {
    ...response,
  };
}
