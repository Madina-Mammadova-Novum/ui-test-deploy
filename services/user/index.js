import {
  chartererSignUpAdapter,
  decodedTokenAdapter,
  forgotPasswordAdapter,
  loginAdapter,
  ownerSignUpAdapter,
  resetPasswordAdapter,
  updateCompanyAdapter,
  updateInfoAdapter,
  updatePasswordAdapter,
} from '@/adapters/user';
import LoginModel from '@/models/loginModel';
import RefreshTokenModel from '@/models/refreshTokenModal';
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
  // TODO: error response doesn't sync with apiHandler
  return {
    ...response,
  };
}

/* Temporary solution */

export async function signIn(credentials) {
  const body = new LoginModel(credentials).setFormData();

  const response = await fetch('https://shiplink-id.azurewebsites.net/connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  return response;
}

export async function refreshAccessToken(token) {
  const body = new RefreshTokenModel(token).setFormData();

  try {
    const response = await fetch('https://shiplink-id.azurewebsites.net/connect/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + decodedTokenAdapter(refreshedTokens?.access_token)?.exp * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
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
