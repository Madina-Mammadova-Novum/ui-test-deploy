import React from 'react';

import PropTypes from 'prop-types';

import { BaseLayout } from '@/layouts';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </BaseLayout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default PageLayout;
