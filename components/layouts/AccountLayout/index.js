'use server';

import { cookies } from 'next/headers';

import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';
import { getLegalLinksData, getSocialLinksData } from '@/services';

const getServerCookie = async () => {
  const role = cookies().get('session-user-role')?.value;

  return { role };
};

export default async function AccountLayout({ children }) {
  const { socials } = await getSocialLinksData();
  const { legal } = await getLegalLinksData();
  const { role } = await getServerCookie();

  const routes = {
    owner: ownerSidebarAdapter({ role }),
    charterer: chartererSidebarAdapter({ role }),
  };

  return (
    <AccountContainer>
      <Sidebar data={routes[role]} />
      <AccountHeader />
      <main className="grow">{children}</main>
      <AccountFooter socials={socials} legal={legal} />
    </AccountContainer>
  );
}
