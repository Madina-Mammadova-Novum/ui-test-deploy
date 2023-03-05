import { forgotPasswordAdapter, resetPasswordAdapter } from '@/adapters/user';
import { postData } from '@/utils/dataFetching';

export async function forgotPassword({ data }) {
  const body = forgotPasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`forgot-password`, body);
  return {
    message,
  };
}

export async function resetPassword({ data }) {
  const body = resetPasswordAdapter({ data });
  const {
    data: { message },
  } = await postData(`reset-password`, body);
  return {
    message,
  };
}
