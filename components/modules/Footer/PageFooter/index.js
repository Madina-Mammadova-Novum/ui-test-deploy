'use server';

import PageFooterClient from './PageFooterClient';

import { getLegalLinksData, getSocialLinksData } from '@/services';
import { getContactInfo, getFooterLinks } from '@/services/navigation';

export default async function PageFooter() {
  const { data } = await getFooterLinks();
  const { socials } = await getSocialLinksData();
  const { legal } = await getLegalLinksData();

  const { address, phones, emails, mapLink } = await getContactInfo();

  return (
    <PageFooterClient
      data={data}
      socials={socials}
      legal={legal}
      address={address}
      phones={phones}
      emails={emails}
      mapLink={mapLink}
    />
  );
}
