import React from 'react';

import { ConcernLayout, PageLayout } from '@/layouts';

const layoutComponent = ({ type, pageData, meta, children }) => {
  if (pageData === undefined) return null;
  let Layout;
  switch (type) {
    case 'page':
      Layout = PageLayout;
      break;
    case 'concern':
      Layout = ConcernLayout;
      break;
    default:
      return null;
  }
  return Layout ? (
    <Layout {...pageData} meta={meta}>
      {children}
    </Layout>
  ) : null;
};

const LayoutManager = (props) => {
  return layoutComponent(props);
};

LayoutManager.defaultProps = {
  type: 'page',
  pageData: null,
  meta: null,
  children: [],
};

export default LayoutManager;
