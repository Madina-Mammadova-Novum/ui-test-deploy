import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';

const AccountLayout = ({ children }) => {
  return (
    <AccountContainer>
      <Sidebar containerStyles="z-50 fixed top-0 left-0 h-screen" />
      <AccountHeader />
      <main className="grow">{children}</main>
      <AccountFooter />
    </AccountContainer>
  );
};

export default AccountLayout;
