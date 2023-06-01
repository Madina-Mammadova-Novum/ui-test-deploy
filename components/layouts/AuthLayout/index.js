import { AuthBasePropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { BaseLayout } from '@/layouts';
import { AuthHeader } from '@/modules';

const AuthLayout = ({ navigation, children }) => {
  return (
    <BaseLayout className="container mx-auto max-w-screen-2xl min-h-screen flex flex-col">
      <AuthHeader navigation={navigation} />
      <div className="fixed left-0 top-0 -z-50 h-full w-image max-w-[46%] w-[calc(100%-732px)] lg:w-[calc(100%-772px)] hidden 3md:block">
        <NextImage
          src="/images/cover.jpg"
          alt="cover"
          customStyles="h-full w-full object-cover"
          height={1000}
          width={1000}
        />
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-2">{children}</section>
    </BaseLayout>
  );
};

AuthLayout.propTypes = AuthBasePropTypes;

export default AuthLayout;
