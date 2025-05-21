'use client';

import dynamic from 'next/dynamic';

import { AuthBasePropTypes } from '@/lib/types';

import { Navbar } from '@/modules';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

const AuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <InAppChecker>
      <header className="sticky left-0 top-0 z-10 flex w-full">
        <Navbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
      </header>
    </InAppChecker>
  );
};

AuthHeader.propTypes = AuthBasePropTypes;

export default AuthHeader;
