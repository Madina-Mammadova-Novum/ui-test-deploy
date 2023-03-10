import React from 'react';

import PropTypes from 'prop-types';

import { navBarPropTypes } from '@/lib/types';

import cover from '@/assets/images/cover.jpg';
import { NextImage } from '@/elements';
import { BaseLayout } from '@/layouts';
import { AuthHeader } from '@/modules';

const AuthLayout = ({ navigation, children }) => {
  return (
    <BaseLayout className="container">
      <AuthHeader navigation={navigation} />
      <section className="grid grid-cols-1 3sm:grid-cols-2 flex-grow gap-20">
        <div className="fixed left-0 top-0 -z-50 h-full w-full hidden 3sm:block">
          <NextImage src={cover} alt="cover" customStyles="h-full w-1/2 object-cover" height={1000} width={1000} />
        </div>
        {children}
      </section>
    </BaseLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  navigation: PropTypes.shape(navBarPropTypes).isRequired,
};

export default AuthLayout;
