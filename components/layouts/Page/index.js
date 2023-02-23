import React from 'react';

import PropTypes from 'prop-types';

import { Header } from '@/common';
import { BaseLayout } from '@/layouts';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      {children}
      <footer>footer</footer>
    </BaseLayout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default PageLayout;
