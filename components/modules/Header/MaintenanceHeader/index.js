'use server';

import Logo from '@/assets/images/logo.svg';

export default async function MaintenanceHeader() {
  return (
    <header className="absolute z-10 w-full">
      <div className="container mx-auto max-w-[1152px] px-4 md:px-8 xl:px-0">
        <div className="flex items-center justify-between border-b border-white/10 py-6 3md:py-5">
          <Logo className="fill-white" />
        </div>
      </div>
    </header>
  );
}
