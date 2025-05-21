'use client';

import dynamic from 'next/dynamic';

import { AuthBasePropTypes } from '@/lib/types';

import { NewNavbar } from '@/modules';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

const NewAuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <InAppChecker>
      <header className="sticky left-0 top-0 z-10 mx-auto flex w-full max-w-[1152px] px-4 md:px-8 xl:px-0">
        <NewNavbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
      </header>
    </InAppChecker>
  );
};

NewAuthHeader.propTypes = AuthBasePropTypes;

export default NewAuthHeader;
