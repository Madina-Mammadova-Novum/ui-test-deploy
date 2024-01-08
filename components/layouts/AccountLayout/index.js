'use server';

import { cookies } from 'next/headers';

import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';

const getServerCookie = async () => {
  const role = cookies()?.get('session-user-role')?.value;

  return { role };
};

export default async function AccountLayout({ children }) {
  const { role } = await getServerCookie();

  const routes = {
    owner: ownerSidebarAdapter({ role }),
    charterer: chartererSidebarAdapter({ role }),
  };

  return (
    role && (
      <AccountContainer role={role}>
        <Sidebar data={routes[role]} containerStyles="z-50 fixed top-0 left-0 h-screen" />
        <AccountHeader />
        <main className="grow">{children}</main>
        <AccountFooter />
        {/* <Chat /> */}
      </AccountContainer>
    )
  );
}
