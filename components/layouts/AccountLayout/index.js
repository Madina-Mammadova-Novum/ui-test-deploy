import { AccountContainer, AccountFooter, AccountHeader, Chat, Sidebar } from '@/modules';
import { getLegalLinksData, getSocialLinksData } from '@/services';

export default async function AccountLayout({ children }) {
  const { socials } = await getSocialLinksData();
  const { legal } = await getLegalLinksData();

  return (
    <AccountContainer>
      <Sidebar />
      <AccountHeader />
      <main className="grow">{children}</main>
      <AccountFooter socials={socials} legal={legal} />
      <Chat />
    </AccountContainer>
  );
}
