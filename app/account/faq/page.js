import React from "react";

import { metaData } from '@/adapters/metaData';
// import { BlockManager } from "@/common";
import { AccountWrapper, FAQBlock } from '@/modules';

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
  // const blocks = [
  //   {
  //     "id": 4,
  //     "__component": "blocks.faq-block",
  //     "title": null,
  //     "shortDescription": null,
  //     "subTitle": null
  //   },
  // ]
  return (
    <AccountWrapper containerClass="grow px-5">
      {/* <div className="space-y-[100px]">{blocks && <BlockManager blocks={blocks} />}</div> */}
       <FAQBlock/>

    </AccountWrapper>
  );
};

export default Faq;
