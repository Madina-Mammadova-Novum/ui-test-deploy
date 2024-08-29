import { AuthBasePropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { AuthHeader } from '@/modules';

const AuthLayout = ({ navigation, children, containerClass = '' }) => {
  return (
    <div className="max-w-screen container mx-auto flex min-h-screen flex-col px-5 md:px-10">
      <AuthHeader navigation={navigation} />
      <div className="xl:w-[calc(100% - 668px)] fixed left-0 top-0 -z-50 hidden h-full 3md:block 3md:w-5/12">
        <NextImage
          src="/images/cover.png"
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
