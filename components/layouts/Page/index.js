import React from 'react';

import PropTypes from 'prop-types';

import { BaseLayout } from '@/layouts';
import { PageHeader } from '@/modules';

const PageLayout = ({ children }) => {
  return (
    <BaseLayout>
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
