import { BaseLayout } from '@/layouts';
import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';

const AccountLayout = ({ children }) => {
  return (
    <BaseLayout className="bg-gray-light flex min-h-screen max-w-screen-2xl">
      <AccountContainer>
        <Sidebar containerStyles="z-50 fixed top-0 left-0 h-screen" />
        <AccountHeader />
        <main className="grow">{children}</main>
        <AccountFooter />
      </AccountContainer>
    </BaseLayout>
  );
};

export default AccountLayout;
