import {
  chartererSignUpAdapter,
  forgotPasswordAdapter,
  loginAdapter,
  ownerSignUpAdapter,
  resetPasswordAdapter,
  updateCompanyAdapter,
  updateInfoAdapter,
  updatePasswordAdapter,
} from '@/adapters/user';
import { postData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`auth/forgot-password`, body);
  return {
    message,
  };
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
  return response;
}

export async function chartererSignUp({ data }) {
  const body = chartererSignUpAdapter({ data });
  const response = await postData(`auth/sign-up?type=charterer`, body);
  return response;
}

export async function postVeriffData({ data }) {
  const response = await postData(`auth/veriffication`, data);
  return response;
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
