import { AuthBasePropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { AuthHeader } from '@/modules';

const AuthLayout = ({ navigation, children, containerClass = '' }) => {
  return (
    <div className="container mx-auto max-w-screen min-h-screen flex flex-col px-5 md:px-10">
      <AuthHeader navigation={navigation} />
      <div className="fixed left-0 top-0 -z-50 h-full 3md:w-5/12 xl:w-[calc(100% - 668px)] hidden 3md:block">
        <NextImage
          src="/images/cover.jpg"
          alt="cover"
          customStyles="h-full w-full object-cover"
          height={1000}
          width={1000}
        />
      </div>
      <section className={`my-auto ${containerClass}`}>{children}</section>
    </div>
  );
};

AuthLayout.propTypes = AuthBasePropTypes;

export default AuthLayout;
