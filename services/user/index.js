import { getFleetByIdAdapter } from '@/adapters';
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
  const response = await postData(`auth/login`, body);

  return {
    ...response,
  };
}

export async function refreshAccessToken({ token }) {
  const response = await postData(`auth/refreshToken`, { token });

  if (response?.data) return response?.data;
  return { ...response };
}

export async function updatePassword({ data }) {
  const body = updatePasswordAdapter({ data });
  const response = await postData(`account/update-password`, body);
  return {
    ...response,
    data: {
      message: response.status === 200 && 'You have successfully changed your password',
    },
  };
}

export async function updateInfo({ data }) {
  const body = updateInfoAdapter({ data });
  const response = await putData(`account/update-info`, body);

  return {
    ...response,
  };
}

export async function updateCompany({ data, role }) {
  const body = roleBasedUpdateCompanyAdapter({ data, role });
  const response = await putData(`account/update-company`, body);

  return {
    ...response,
    data: {
      message: response.status === 200 && 'You will be notified soon. The rest of the changes have been edited',
    },
  };
}

export async function deleteCompany({ data }) {
  const body = deleteCompanyAdapter({ data });
  const response = await deleteData(`account/delete-company`, body);
  return {
    ...response,
  };
}

export async function getUserPositions() {
  const response = await getData(`account/my-positions`);

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
    tankers: userTankersDetailsAdapter({ data: tankers }),
  };
};

export function* getVesselsById(data) {
  if (!data) return [];

  return yield Promise.all(data.map(fetchUserVesselById));
}

export async function getUserFixtures() {
  const response = await getData(`account/fixture`);
  return {
    ...response,
  };
}

export async function getUserPreFixtures() {
  const response = await getData(`account/pre-fixture`);
  return {
    ...response,
  };
}

export async function getUserNegotiating() {
  const response = await getData(`account/negotiating`);
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
    query: 'all',
  };

  const response = await getData(`account/fleets`, body);
  return {
    ...response,
  };
}
