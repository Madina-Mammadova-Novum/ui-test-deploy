import React from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import FooterNavigation from '@/blocks/FooterNavigation';
import { LayoutManager, PreviewBanner, Seo } from '@/common';
import Footer from '@/common/Footer';
import Header from '@/common/Header';

const BaseLayout = ({ global, children, pageData, meta, preview, type }) => {
  return (
    <div className="isolate bg-lightBlue">
      <Seo seo={delve(pageData, 'seo')} />
      {preview && <PreviewBanner />}
      <Header navigation={global?.navigation} header={global?.header} contacts={global?.contacts} />
      <main>
        <LayoutManager pageData={pageData} meta={meta} type={type}>
          {children}
        </LayoutManager>
      </main>
      {global?.footerNavigation && <FooterNavigation footerNavigation={global?.footerNavigation} />}
      {global?.footer && <Footer footer={global?.footer} contacts={global?.contacts} />}
    </div>
  );
};

BaseLayout.defaultProps = {
  preview: null,
  type: 'page',
};

BaseLayout.propTypes = {
  global: PropTypes.shape({
    footer: PropTypes.shape({}),
    header: PropTypes.shape({}),
    navigation: PropTypes.shape({}),
    contacts: PropTypes.shape({}),
    footerNavigation: PropTypes.shape({}),
  }).isRequired,
  children: PropTypes.shape({}).isRequired,
  pageData: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({}).isRequired,
  preview: PropTypes.string,
  type: PropTypes.string,
};

export default BaseLayout;
