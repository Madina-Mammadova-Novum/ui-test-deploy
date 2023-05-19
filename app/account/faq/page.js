import React from 'react';

import { metaData } from '@/adapters/metaData';
import { AccountWrapper, FAQByType } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'FAQ',
      },
    },
  });
}

const Faq = () => {
  return (
    <AccountWrapper containerClass="grow px-5">
      <FAQByType />
    </AccountWrapper>
  );
};

export default Faq;
