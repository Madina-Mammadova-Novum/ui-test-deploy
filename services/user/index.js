import { getFleetByIdAdapter } from '@/adapters';
import { accountNavigationAdapter } from '@/adapters/navigation';
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
import { ContentTypeJson, DEFAULT_FETCH_AMOUNT, ROLES } from '@/lib/constants';
import { deleteData, getData, postData, putData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });
  const response = await postData(`auth/forgot-password`, body);
  return {
    ...response,
  };
}

export async function resetPassword({ data }) {
  const body = resetPasswordAdapter({ data });
  const response = await postData(`auth/reset-password`, body);
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

  if (response?.data) return response?.data;
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
  const response = await putData(`account/update-company`, body, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
    data: {
      message: response.status === 200 && 'You will be notified soon. The rest of the changes have been edited',
    },
  };
}

export async function deleteCompany({ data }) {
  const body = deleteCompanyAdapter({ data });
  const response = await deleteData(`account/delete-company`, body, { headers: { ...ContentTypeJson() } });
  return {
    ...response,
  };
}

export async function getUserPositions({ page = 1, perPage = 5, sortBy = 'asc' }) {
  const body = accountNavigationAdapter({ data: { page, perPage, sortBy } });

  const response = await postData(`account/my-positions?page=${page}&perPage=${perPage}&sortBy=${sortBy}`, body, {
    headers: { ...ContentTypeJson() },
  });

  return {
    ...response,
  };
}

export async function getUserPositionById({ id }) {
  const body = getFleetByIdAdapter({ id });
  const response = await putData(`account/my-positions/vesselId`, body, { headers: { ...ContentTypeJson() } });

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

export async function getUserPreFixtures() {
  const response = await getData(`account/pre-fixture`, { headers: { ...ContentTypeJson() } });
  return {
    ...response,
  };
}

export function getUserNegotiating(role) {
  switch (role) {
    case ROLES.OWNER: {
      return getOwnerNegotiating;
    }
    case ROLES.CHARTERER: {
      return getChartererNegotiating;
    }
    default:
      return () => {};
  }
}

export async function getOwnerNegotiating() {
  const body = {
    skip: 0,
    pageSize: 1000,
    stage: 'Negotiating',
  };
  const response = await postData(`account/negotiating/owner`, body);
  return {
    ...response,
  };
}

export async function getChartererNegotiating() {
  const response = await getData(`account/negotiating/charterer`);
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

export async function getUserOnSubs() {
  const response = await getData(`account/on-subs`);
  return {
    ...response,
  };
}

export async function getUserFleets() {
  const body = {
    pageSize: DEFAULT_FETCH_AMOUNT,
  };

  const response = await postData(`account/fleets`, body);
  return {
    ...response,
  };
}
