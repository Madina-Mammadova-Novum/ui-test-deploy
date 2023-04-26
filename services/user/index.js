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
import { getData, postData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });
  const response = await postData(`auth/forgot-password`, body);
  return response;
}

export async function resetPassword({ data }) {
  const body = resetPasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`auth/reset-password`, body);
  return {
    message,
  };
}

export async function ownerSignUp({ data }) {
  const body = ownerSignUpAdapter({ data });
  const response = await postData(`auth/sing-up?type=owner`, body);
  return !response.ok ? { message: 'Check your email for validating the account' } : { error: 'Something went wrong' };
}

export async function chartererSignUp({ data }) {
  const body = chartererSignUpAdapter({ data });
  const response = await postData(`auth/sign-up?type=charterer`, body);
  return !response.ok ? { message: 'Check your email for validating the account' } : { error: 'Something went wrong' };
}

export async function postVeriffData({ data }) {
  const response = await postData(`auth/veriffication`, data);
  const result = await response.json();

  if (!response.ok) return { error: 'something went wrong' };

  return { link: result?.redirectUrl };
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
