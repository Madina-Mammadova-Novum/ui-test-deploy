import React from 'react';

import PropTypes from 'prop-types';

import { PageFooter, PageHeader } from '@/common';
import { BaseLayout } from '@/layouts';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout>
      {/* <Header /> */}
      <div className="ml-auto">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </BaseLayout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default PageLayout;
