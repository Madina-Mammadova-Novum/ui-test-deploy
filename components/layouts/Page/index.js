import { BaseLayout } from '@/layouts';
import { PageFooter, PageHeader } from '@/modules';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout className="bg-gray-light flex min-h-screen max-w-screen-2xl">
      <div className="flex flex-col grow relative">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </BaseLayout>
  );
};

export default PageLayout;
