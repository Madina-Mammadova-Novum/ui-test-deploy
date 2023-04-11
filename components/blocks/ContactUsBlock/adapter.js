import { linkImageAdapter } from '@/adapters/global';
import { getSingleType } from '@/services/singleType';

export const updateContactUsBlock = async (block) => {
  const { phones, emails, address, schedule } = await getSingleType('contact-information', 'en');
  const { socials } = await getSingleType('social-network', 'en');
  return {
    ...block,
    phones: phones ? phones.map(({ Phone }) => Phone) : [],
    emails: emails ? emails.map(({ Email }) => Email) : [],
    socialLinks: socials ? socials.map((link) => linkImageAdapter(link)) : [],
    address,
    schedule,
  };
};
