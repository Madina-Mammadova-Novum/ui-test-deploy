import { getFleetByIdAdapter, responseFailedOffersAdapter, responseOwnerPrefixtureAdapter } from '@/adapters';
import { basePageNavAdapter, negotiationPageNavAdapter, positionsPageNavAdapter } from '@/adapters/navigation';
import { responsePostFixtureAdapter } from '@/adapters/post-fixture';
import {
  chartererSignUpAdapter,
  deleteCompanyAdapter,
  forgotPasswordAdapter,
  loginAdapter,
  ownerSignUpAdapter,
  resetPasswordAdapter,
  roleBasedUpdateCompanyAdapter,
  updateInfoAdapter,
  updatePasswordAdapter,
} from '@/adapters/user';
import { userTankersDetailsAdapter } from '@/adapters/vessel';
import { ContentTypeJson } from '@/lib/constants';
import { deleteData, getData, postData, putData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });

  const response = await postData(`auth/forgot-password`, body, { headers: { ...ContentTypeJson() } });

  if (!response.error) response.message = 'A link to reset your password has been sent! Please check your e-mail';

  return {
    ...response,
  };
}

export async function resetPassword({ data }) {
  const body = resetPasswordAdapter({ data });
  const response = await postData(`auth/reset-password`, body, { headers: { ...ContentTypeJson() } });
  return {
    ...response,
  };
}

export async function ownerSignUp({ data }) {
  const body = ownerSignUpAdapter({ data });
  const response = await postData(`auth/signup?type=owner`, body);

  return {
    ...response,
    data: {
      message:
        response.status === 200 &&
        'To confirm registration, follow the link that was sent to the email address, you provided',
    },
  };
}

export async function chartererSignUp({ data }) {
  const body = chartererSignUpAdapter({ data });
  const response = await postData(`auth/signup?type=charterer`, body);
  return {
    ...response,
    data: {
      message:
        response.status === 200 &&
        'To confirm registration, follow the link that was sent to the email address, you provided',
    },
  };
}

export async function postVerificationData({ data }) {
  const response = await postData(`auth/verification`, data);
  return {
    ...response,
  };
}

export async function login({ data }) {
  const body = loginAdapter({ data });

  const response = await postData(`auth/login`, body, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
  };
}

export async function refreshAccessToken({ token }) {
  const response = await postData(`auth/session-update`, { token }, { headers: { ...ContentTypeJson() } });

  return { ...response };
}

export async function updatePassword({ data }) {
  const body = updatePasswordAdapter({ data });
  const response = await postData(`account/update-password`, body, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
    data: {
      message: response.status === 200 && 'You have successfully changed your password',
    },
  };
}

export async function updateInfo({ data }) {
  const body = updateInfoAdapter({ data });
  const response = await putData(`account/update-info`, body, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
  };
}

export async function cancelUpdateInfo() {
  const response = await putData(`account/cancel-update-info`);

  return {
    ...response,
  };
}

export async function updateCompany({ data, role }) {
  const body = roleBasedUpdateCompanyAdapter({ data, role });

  const response = await putData(`account/update-company`, body);

  return {
    ...response,
  };
}

export async function cancelUpdateCompany() {
  const response = await putData(`account/cancel-update-company`);

  return {
    ...response,
  };
}

export async function deleteCompany({ data }) {
  const body = deleteCompanyAdapter({ data });
  const response = await deleteData(`account/delete-company`, body);

  if (!response.error) {
    response.message = 'You have successfully sent a request to delete your account';
  }

  return {
    ...response,
  };
}

export async function getUserPositions({ page = 1, perPage = 5, sortBy = 'asc' }) {
  const body = positionsPageNavAdapter({ data: { page, perPage, sortBy } });

  const response = await postData(`account/positions?page=${page}&perPage=${perPage}&sortBy=${sortBy}`, body);

  return {
    ...response,
  };
}

export async function getUserPositionById({ id }) {
  const body = getFleetByIdAdapter({ id });

  const response = await putData(`account/positions/${id}`, body);

  return {
    ...response,
  };
}

const fetchUserVesselById = async ({ id, ...rest }) => {
  const { data: tankers } = await getUserPositionById({ id });

  return {
    ...rest,
    fleetId: id,
    tankers: userTankersDetailsAdapter({ data: tankers }),
  };
};

export const getVesselsById = async (data) => {
  if (!data) return null;

  return Promise.all(data.map(fetchUserVesselById));
};

export async function getRoleBasedPrefixture({ page, perPage }) {
  return searchDeals({
    page,
    perPage,
    filters: { Stages: ['Pre_Fixture'] },
    dataAdapter: responseOwnerPrefixtureAdapter,
  });
}

export async function getRoleBasedNegotiating({ role, page = 1, perPage = 5, stage = 'Negotiating' }) {
  const body = negotiationPageNavAdapter({ data: { page, perPage, stage } });

  const response = await postData(`account/negotiating/${role}?page=${page}&perPage=${perPage}`, body);

  return {
    ...response,
  };
}

export async function getUserProfile() {
  const response = await getData(`account/user-profile`);

  return {
    ...response,
  };
}

export async function getUserCompany() {
  const response = await getData(`account/user-company`);

  return {
    ...response,
  };
}

export async function getChartererUserCargoes() {
  const response = await getData(`account/user-profile-cargoes`);

  return {
    ...response,
  };
}

export async function getUserFleets({ page, perPage, sortBy = 'asc' }) {
  const body = positionsPageNavAdapter({ data: { page, perPage, sortBy } });

  const response = await postData(`account/fleets`, body);

  return {
    ...response,
  };
}

export async function getRoleBasedOnSubs({ page, perPage }) {
  return searchDeals({
    page,
    perPage,
    filters: { Stages: ['On_Subs'] },
    dataAdapter: responseOwnerPrefixtureAdapter,
  });
}

export async function getPostFixtureOffers({ page, perPage, filters, sorting }) {
  return searchDeals({
    page,
    perPage,
    filters: { ...filters, Stages: ['Post_Fixture'] },
    sorting,
    dataAdapter: responsePostFixtureAdapter,
  });
}

export async function getFailedOffers({ page, perPage, filters, sorting, isFailed = false }) {
  return searchDeals({
    page,
    perPage,
    filters,
    sorting,
    dataAdapter: responseFailedOffersAdapter,
    IsFailed: isFailed,
  });
}

/**
 * General purpose function to search deals across all stages
 * @param {Object} params - Search parameters
 * @param {number} params.page - Page number (1-based)
 * @param {number} params.perPage - Items per page
 * @param {Object} params.filters - Filter criteria including Stages
 * @param {Object} params.sorting - Sorting parameters
 * @param {Function} params.dataAdapter - Optional adapter for response data
 * @returns {Promise<Object>} API response
 */
export async function searchDeals({ page = 1, perPage = 10, filters = {}, sorting = {}, dataAdapter, ...otherParams }) {
  const body = basePageNavAdapter({ data: { page, perPage } });

  const response = await postData(`account/deals`, {
    ...body,
    filters,
    sorting,
    skip: (page - 1) * perPage,
    pageSize: perPage,
    ...(dataAdapter && { dataAdapter }),
    ...otherParams,
  });

  return {
    ...response,
  };
}

export async function getFixtureOffers({ page, perPage }) {
  return searchDeals({
    page,
    perPage,
    filters: { Stages: ['Fixture'] },
  });
}
