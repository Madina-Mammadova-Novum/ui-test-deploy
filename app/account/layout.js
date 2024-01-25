import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { AccountLayout } from '@/layouts';
import { getLegalLinksData, getRole, getSocialLinksData } from '@/services';

export default async function AccountRootLayout({ children }) {
  const { socials } = await getSocialLinksData();
  const { legal } = await getLegalLinksData();
  const { data } = await getRole();

  const routes = {
    owner: ownerSidebarAdapter({ role: data.role }),
    charterer: chartererSidebarAdapter({ role: data.role }),
  };

  return (
    <AccountLayout socials={socials} legal={legal} routes={routes[data.role]}>
      {children}
    </AccountLayout>
  );
}
