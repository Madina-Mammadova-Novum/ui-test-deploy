import React from 'react';

import { AuthLayout, PageLayout } from '@/layouts';

const layoutComponent = ({ pageData, meta, children }) => {
  let Layout;
  switch (children.props.childProp.segment) {
    case 'page':
    case 'negotiating':
    case 'uikit':
      Layout = PageLayout;
      break;
    case 'forgot-password':
    case 'reset-password':
    case 'signup':
      Layout = AuthLayout;
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
