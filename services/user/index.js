import {
  forgotPasswordAdapter,
  resetPasswordAdapter,
  singUpAdapter,
  updatePasswordAdapter,
  updatePersonalCompanyAdapter,
  updatePersonalInfoAdapter,
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

export async function singUp({ data }) {
  const body = singUpAdapter({ data });
  const response = await postData(`auth/sing-up`, JSON.stringify(body));
  return response;
}

export async function updatePersonalPassword({ data }) {
  const body = updatePasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`personal/update-password`, body);
  return {
    message,
  };
}

export async function updatePersonalInfo({ data }) {
  const body = updatePersonalInfoAdapter({ data });
  const {
    data: { message },
  } = await postData(`personal/update-user-info`, body);
  return {
    message,
  };
}

export async function updatePersonalCompany({ data }) {
  const body = updatePersonalCompanyAdapter({ data });
  const {
    data: { message },
  } = await postData(`personal/update-company`, body);
  return {
    message,
  };
}
