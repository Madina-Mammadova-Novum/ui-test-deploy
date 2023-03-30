import { BaseLayout } from '@/layouts';
import { PageFooter, PageHeader, Sidebar } from '@/modules';
import { sidebarData } from '@/utils/mock';

const AccountLayout = ({ children }) => {
  // todo: sidebar data here
  // todo: https://github.com/shadcn/taxonomy - example
  return (
    <BaseLayout className="bg-gray-light flex min-h-screen max-w-screen-2lg">
      <Sidebar data={sidebarData} containerStyles="z-50" />
      <div className="flex flex-col grow">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </BaseLayout>
  );
};

export default AccountLayout;
