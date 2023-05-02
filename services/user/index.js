import {
  chartererSignUpAdapter,
  forgotPasswordAdapter,
  loginAdapter,
  ownerSignUpAdapter,
  positionsAdapter,
  resetPasswordAdapter,
  updateCompanyAdapter,
  updateInfoAdapter,
  updatePasswordAdapter,
  userDetailsAdapter,
} from '@/adapters/user';
import { SYSTEM_ERROR } from '@/lib/constants';
import { getData, postData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });
  const response = await postData(`auth/forgot-password`, body);
  return response;
}

export async function resetPassword({ data }) {
  const body = resetPasswordAdapter({ data });
  const response = await postData(`auth/reset-password`, body);
  return response;
}

export async function ownerSignUp({ data }) {
  const body = ownerSignUpAdapter({ data });
  const response = await fetch(`https://shiplink-api.azurewebsites.net/v1/owner/company/create`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
  /* const response = await postData(`auth/signup?type=owner`, body); */
  // TODO: postData for signup doesn't return actual response from backend
  return response.ok ? { message: 'Check your email for validating the account' } : { error: SYSTEM_ERROR };
}

export async function chartererSignUp({ data }) {
  const body = chartererSignUpAdapter({ data });
  const response = await fetch(`https://shiplink-api.azurewebsites.net/v1/charterer/company/create`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
  /* const response = await postData(`auth/signup?type=charterer`, body); */
  // TODO: postData for signup doesn't return actual response from backend
  return response.ok ? { message: 'Check your email for validating the account' } : { error: SYSTEM_ERROR };
}

export async function postVeriffData({ data }) {
  const { data: link } = await postData(`auth/veriffication`, data);
  if (link) {
    return { link };
  }
  return { error: SYSTEM_ERROR };
}

export async function login({ data }) {
  const body = loginAdapter({ data });
  const response = await postData(`auth/login`, JSON.stringify(body));
  return response;
}

export async function updatePassword({ data }) {
  const body = updatePasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`account/update-password`, body);
  return {
    message,
  };
}

export async function updateInfo({ data }) {
  const body = updateInfoAdapter({ data });
  const {
    data: { message },
  } = await postData(`account/update-info`, body);
  return {
    message,
  };
}

export async function updateCompany({ data }) {
  const body = updateCompanyAdapter({ data });
  const {
    data: { message },
  } = await postData(`account/update-company`, body);
  return {
    message,
  };
}

export async function getUserPositions() {
  const { data } = await getData(`account/my-positions`);
  return positionsAdapter({ data });
}

export async function getUserFixtures() {
  const { data } = await getData(`account/fixture`);
  return data;
}

export async function getUserPreFixtures() {
  const { data } = await getData(`account/pre-fixture`);
  return data;
}

export async function getUserNegotiating() {
  const { data } = await getData(`account/negotiating`);
  return data;
}

export async function getUserDetails() {
  const { data } = await getData(`account/user-info`);
  return userDetailsAdapter({ data });
}
