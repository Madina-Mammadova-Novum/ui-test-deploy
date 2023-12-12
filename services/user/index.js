import { getSession } from 'next-auth/react';

import { getFleetByIdAdapter } from '@/adapters';
import { basePageNavAdapter, negotiationPageNavAdapter, positionsPageNavAdapter } from '@/adapters/navigation';
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

export async function postVeriffData({ data }) {
  const response = await postData(`auth/veriffication`, data);
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
  const response = await postData(`auth/refreshToken`, { token }, { headers: { ...ContentTypeJson() } });

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

export async function updateCompany({ data, role }) {
  const body = roleBasedUpdateCompanyAdapter({ data, role });

  const response = await putData(`account/update-company`, body);

  if (!response.error) response.message = 'You will be notified soon. The rest of the changes have been edited';

  return {
    ...response,
  };
}

export async function deleteCompany({ data }) {
  const body = deleteCompanyAdapter({ data });
  const response = await deleteData(`account/delete-company`, body);
  return {
    ...response,
  };
}

export async function getUserPositions({ page = 1, perPage = 5, sortBy = 'asc' }) {
  const body = positionsPageNavAdapter({ data: { page, perPage, sortBy } });

  const response = await postData(`account/my-positions?page=${page}&perPage=${perPage}&sortBy=${sortBy}`, body);

  return {
    ...response,
  };
}

export async function getUserPositionById({ id }) {
  const body = getFleetByIdAdapter({ id });
  const response = await putData(`account/my-positions/vesselId`, body);

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

export function* getVesselsById(data) {
  return yield Promise.all(data.map(fetchUserVesselById));
}

export async function getUserFixtures() {
  const response = await getData(`account/fixture`, { headers: { ...ContentTypeJson() } });
  return {
    ...response,
  };
}

export async function getRoleBasedPrefixture({ page, perPage }) {
  const body = basePageNavAdapter({ data: { page, perPage } });

  const response = await postData(`account/pre-fixture?page=${page}&perPage=${perPage}`, body);

  return {
    ...response,
  };
}

export async function getRoleBasedNegotiating({ page = 1, perPage = 5, stage = 'Negotiating' }) {
  const session = await getSession();
  const body = negotiationPageNavAdapter({ data: { page, perPage, stage } });

  const response = await postData(`account/negotiating/${session.role}?page=${page}&perPage=${perPage}`, body);

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
  const body = basePageNavAdapter({ data: { page, perPage } });

  const response = await postData(`account/on-subs?page=${page}&perPage=${perPage}`, body);

  return {
    ...response,
  };
}

export async function getPostFixtureOffers({ page, perPage, filters, sorting }) {
  const body = basePageNavAdapter({ data: { page, perPage } });

  const response = await postData(`account/post-fixture?page=${page}&perPage=${perPage}`, {
    ...body,
    filters,
    sorting,
  });

  return {
    ...response,
  };
}

export async function getFixtureOffers({ page, perPage }) {
  const body = basePageNavAdapter({ data: { page, perPage } });

  const response = await postData(`account/fixture?page=${page}&perPage=${perPage}`, body);

  return {
    ...response,
  };
}
