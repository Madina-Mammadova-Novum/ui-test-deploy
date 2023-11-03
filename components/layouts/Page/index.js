import { PageFooter, PageHeader } from '@/modules';

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen max-w-screen-2xl">
      <div className="flex flex-col grow relative">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
