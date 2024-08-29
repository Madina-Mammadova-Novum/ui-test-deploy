import { PageFooter, PageHeader } from '@/modules';

export default function PageLayout({ children }) {
  return (
    <div className="max-w-screen flex min-h-screen">
      <div className="relative flex w-full flex-col md:grow">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
