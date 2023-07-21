import { PageFooter, PageHeader } from '@/modules';

const PageLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen max-w-screen-2xl">
      <div className="flex flex-col grow relative">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
};

export default PageLayout;
