import { AuthBasePropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { BaseLayout } from '@/layouts';
import { AuthHeader } from '@/modules';

const AuthLayout = ({ navigation, children }) => {
  return (
    <BaseLayout className="container max-w-screen-2xl min-h-screen flex flex-col">
      <AuthHeader navigation={navigation} />
      <section className="grid grid-cols-1 3md:grid-cols-2 flex-grow gap-20">
        <div className="fixed left-0 top-0 -z-50 h-full w-full hidden 3md:block">
          <NextImage
            src="/images/cover.jpg"
            alt="cover"
            customStyles="h-full w-1/2 object-cover"
            height={1000}
            width={1000}
          />
        </div>
        {children}
      </section>
    </BaseLayout>
  );
};

AuthLayout.propTypes = AuthBasePropTypes;

export default AuthLayout;
