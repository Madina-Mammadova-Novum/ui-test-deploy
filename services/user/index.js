import { forgotPasswordAdapter } from '@/adapters/user';
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
