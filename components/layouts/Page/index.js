import { PageFooter, PageHeader } from '@/modules';

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen max-w-screen">
      <div className="flex flex-col grow relative">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
