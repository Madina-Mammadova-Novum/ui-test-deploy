import React from 'react';

import PropTypes from 'prop-types';

import { PageHeader } from '@/common';
import { BaseLayout } from '@/layouts';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout>
      {/* <Header /> */}
      <div className="ml-auto">
        <PageHeader />
        {children}
        <footer className="fixed right-0 bottom-0 h-10 w-[calc(100vw-256px)] shadow-xmd">footer</footer>
      </div>
    </BaseLayout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default PageLayout;
