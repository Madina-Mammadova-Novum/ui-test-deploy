import React from 'react';

import PropTypes from 'prop-types';

import { BaseLayout } from '@/layouts';
import { PageHeader } from '@/modules';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout className="bg-gray-light">
      <PageHeader />
      {children}
      <footer className="relative right-0 top-0 w-full ml-auto shadow-xmd py-2 px-5">footer</footer>
    </BaseLayout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default PageLayout;
