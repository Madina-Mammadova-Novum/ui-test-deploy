import {
  chartererSignUpAdapter,
  forgotPasswordAdapter,
  loginAdapter,
  ownerSignUpAdapter,
  refreshedTokenAdapter,
  resetPasswordAdapter,
  updateCompanyAdapter,
  updateInfoAdapter,
  updatePasswordAdapter,
  userRefreshedTokenAdapter,
} from '@/adapters/user';
import { getData, postData, putData } from '@/utils/dataFetching';

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
        !response.error && 'To confirm registration, follow the link that was sent to the email address, you provided',
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
        !response.error && 'To confirm registration, follow the link that was sent to the email address, you provided',
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

/* Temporary solution */

export async function refreshAccessToken(token) {
  const body = refreshedTokenAdapter({ token });

  const { data } = await postData(`auth/refreshToken`, body);

  if (data) return userRefreshedTokenAdapter({ data, token });

  return {
    token,
    error: 'RefreshAccessTokenError',
  };
}

export async function updatePassword({ data }) {
  const body = updatePasswordAdapter({ data });
  const response = await putData(`account/update-password`, body);
  return {
    ...response,
  };
}

export async function updateInfo({ data }) {
  const body = updateInfoAdapter({ data });
  const response = await putData(`account/update-info`, body);
  return {
    ...response,
  };
}

export async function updateCompany({ data }) {
  const body = updateCompanyAdapter({ data });
  const response = await putData(`account/update-company`, body);
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

export async function getUserDetails() {
  const response = await getData(`account/user-info`);
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
