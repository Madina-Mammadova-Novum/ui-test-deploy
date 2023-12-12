import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { ExtraDataManager } from '@/common';
import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';

export default async function AccountLayout({ children, session }) {
  const routes = {
    owner: ownerSidebarAdapter({ role: session.role }),
    charterer: chartererSidebarAdapter({ role: session.role }),
  };

  return (
    <ExtraDataManager session={session}>
      <AccountContainer>
        <Sidebar data={routes[session.role]} containerStyles="z-50 fixed top-0 left-0 h-screen" />
        <AccountHeader user={session.user} />
        <main className="grow">{children}</main>
        <AccountFooter />
      </AccountContainer>
    </ExtraDataManager>
  );
}
