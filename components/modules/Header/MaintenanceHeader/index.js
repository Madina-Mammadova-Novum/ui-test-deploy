'use server';

import SmallLogo from '@/assets/images/logo-sm.svg';
import Logo from '@/assets/images/logo.svg';

export default async function MaintenanceHeader() {
  return (
    <header className="absolute z-10 w-full">
      <div className="container mx-auto max-w-[1258px] px-4 md:px-8 3md:px-14">
        <div className="flex items-center justify-between border-b border-white/10 py-6 3md:py-5">
          <Logo className="hidden fill-white md:block" />
          <SmallLogo className="fill-white md:hidden" />
        </div>
      </div>
    </header>
  );
}
