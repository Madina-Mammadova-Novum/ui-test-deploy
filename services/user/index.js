import { forgotPasswordAdapter, resetPasswordAdapter, singUpAdapter } from '@/adapters/user';
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
