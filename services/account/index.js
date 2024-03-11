import { requestDeactivateAccountAdapter } from '@/adapters/account';
import { postData } from '@/utils/dataFetching';

export async function deactivateAccount({ data }) {
  const body = requestDeactivateAccountAdapter({ data });
  const response = await postData(`account/deactivate`, body);

  if (!response.error) response.message = 'You have successfully deactivated your account';

  return {
    ...response,
  };
}
