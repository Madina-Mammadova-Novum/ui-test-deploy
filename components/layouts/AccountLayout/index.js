import { AccountContainer, AccountFooter, AccountHeader, Chat, Sidebar } from '@/modules';

const AccountLayout = ({ children }) => {
  return (
    <AccountContainer>
      <Sidebar containerStyles="z-50 fixed top-0 left-0 h-screen" />
      <AccountHeader />
      <main className="grow">{children}</main>
      <AccountFooter />
      <Chat />
    </AccountContainer>
  );
};

export default AccountLayout;
