import { contactUsDataAdapter } from '@/adapters';
import { postData } from '@/utils/dataFetching';

export async function contactUs({ data }) {
  const body = contactUsDataAdapter({ data });

  const response = await postData(`contact-us`, body);

  return {
    ...response,
  };
}
