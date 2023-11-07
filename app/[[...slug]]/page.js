import React from 'react';

import classnames from 'classnames';
import parse from 'html-react-parser';
import { notFound } from 'next/navigation';

import { legalPropAdpater } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { BlockManager } from '@/common';
import { NextImage } from '@/elements';
import { getHomePageData } from '@/services';
import { getEntityData } from '@/services/collectionType';

export async function generateMetadata({ params }) {
  const data = await getEntityData(params);
  return metaData(data);
}

export default async function Home({ params }) {
  const { legal } = legalPropAdpater({ params });

  const { pageData, blocks, content } = await getHomePageData({ params });

  if (!pageData) notFound();

  /*
  todo: temporary solution (26-31) - need to solve the situation with double links to the same page
        for example:
        /legal/terms-of-use
        /terms-of-use
        these will be pages with identical content and that not good
  */

  return (
    <main className={classnames(legal && 'legal-styles')}>
      {/* todo: example to use legal variable */}
      <section className="relative pt-[115px] pb-[195px] bg-gray-light">
        <div className="container mx-auto px-6 3md:px-14 max-w-[1258px]">
          <NextImage
            src="/images/waves.jpg"
            alt="waves"
            customStyles="absolute inset-0 z-0 h-full w-full object-cover object-center"
            height={352}
            width={1440}
            quality={100}
          />
          {content && <div className="heading-wrapper relative z-10 text-white">{parse(content)}</div>}
        </div>
      </section>
      <div className="space-y-[100px]">{blocks && <BlockManager blocks={blocks} />}</div>
    </main>
  );
}
