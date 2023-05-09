import { getSingleType } from '@/services/singleType';

export const updateContactUsBlock = async (block) => {
  const { phones, emails, address, schedule, embedMap } = await getSingleType('contact-information', 'en');
  return {
    ...block,
    phones: phones ? phones.map(({ Phone }) => Phone) : [],
    emails: emails ? emails.map(({ Email }) => Email) : [],
    address,
    schedule,
    embedMap,
  };
};
