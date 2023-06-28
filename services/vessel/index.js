import {
  requestAddVesselByImoAdapter,
  requestAddVesselManuallyAdapter,
  requestSearchVesselAdapter,
} from '@/adapters/vessel';
import { getData, postData } from '@/utils/dataFetching';

export async function searchVessels({ data }) {
  const body = requestSearchVesselAdapter({ data });
  const response = await postData(`vessels/search`, body);
  return {
    ...response,
  };
}

export async function addVesselByImo({ data, fleetId }) {
  const body = requestAddVesselByImoAdapter({ data });
  const response = await postData(`vessels/add-by-imo/${fleetId}`, body);
  return {
    ...response,
  };
}

export async function addVesselManually({ data }) {
  const body = requestAddVesselManuallyAdapter({ data });
  const response = await postData(`vessels/add-manually`, body);
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

export async function getVesselCategoryOne(vasselTypeId) {
  const response = await getData(`vessels/category-one/${vasselTypeId}`);
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
