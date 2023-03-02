'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants';
import { Navbar } from '@/modules';

const AuthHeader = () => {
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
        return (
          <Navbar placeholder="Don’t have an account?" cta="Registration" contrasted={false} onClick={handleNavigate} />
        );
      default:
        return <Navbar placeholder="Already have an account?" cta="Log in" contrasted onClick={handleNavigate} />;
    }
  }, [handleNavigate, pathName]);

  return <header className="flex bg-transparent w-full fixed z-10 left-0 top-0 px-10">{printNav}</header>;
};

export default AuthHeader;
