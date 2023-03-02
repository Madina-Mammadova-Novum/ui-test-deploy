import React from 'react';

import PropTypes from 'prop-types';

import { Header } from '@/common';
import { BaseLayout } from '@/layouts';

const SignupLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      {children}
    </BaseLayout>
  );
};

SignupLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SignupLayout;
