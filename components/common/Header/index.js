'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants';
import { Navbar } from '@/ui';

const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleNavigate = useCallback(() => {
    switch (pathName) {
      case ROUTES.LOGIN:
        return router.push(ROUTES.SIGNUP);
      default:
        return router.push(ROUTES.LOGIN);
    }
  }, [pathName, router]);

  const printNav = useMemo(() => {
    switch (pathName) {
      case ROUTES.LOGIN:
        return <Navbar placeholder="Don’t have an account?" cta="Registration" onClick={handleNavigate} />;
      default:
        return <Navbar placeholder="Already have an account?" cta="Log in" onClick={handleNavigate} />;
    }
  }, [handleNavigate, pathName]);

  return <header className="flex bg-transparent">{printNav}</header>;
};

export default Header;
