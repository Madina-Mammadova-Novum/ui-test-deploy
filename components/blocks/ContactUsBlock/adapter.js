import delve from 'dlv';

import { getSingleType } from '@/services/singleType';

export const updateContactUsBlock = async (block) => {
  const response = await getSingleType('contact-information', 'en');
  const phones = delve(response, 'data.phones');
  const emails = delve(response, 'data.emails');
  const address = delve(response, 'data.address');
  const schedule = delve(response, 'data.schedule');
  const embedMap = delve(response, 'data.embedMap');
  return {
    ...block,
    phones: phones ? phones.map(({ Phone }) => Phone) : [],
    emails: emails ? emails.map(({ Email }) => Email) : [],
    address,
    schedule,
    embedMap,
  };
};
