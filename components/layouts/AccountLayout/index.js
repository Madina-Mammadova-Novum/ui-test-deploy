import { getServerSession } from 'next-auth';

import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { AccountContainer, AccountFooter, AccountHeader, Chat, Sidebar } from '@/modules';
import { AUTHCONFIG } from '@/utils/auth';

export default async function AccountLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  const routes = {
    owner: ownerSidebarAdapter({ role: session.role }),
    charterer: chartererSidebarAdapter({ role: session.role }),
  };

  return (
    <AccountContainer>
      <Sidebar data={routes[session.role]} containerStyles="z-50 fixed top-0 left-0 h-screen" />
      <AccountHeader user={session.user} />
      <main className="grow">{children}</main>
      <AccountFooter />
      <Chat />
    </AccountContainer>
  );
}
