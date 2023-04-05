import React from 'react';

import { metaData } from '@/adapters/metaData';
import waves from '@/assets/images/waves.jpg';
import { BlockManager } from '@/common';
import { NextImage, Title } from '@/elements';
import { getEntityData } from '@/services/collectionType';

export async function generateMetadata({ params }) {
  const data = await getPage(params);
  return metaData({ data });
}

export default async function Home({ params }) {
  const { title } = await getPage(params);

  return (
    <main className="space-y-[100px]">
      <section className="relative pt-[115px] pb-[86px] text-white">
        <div className="container mx-auto max-w-[960px]">
          <NextImage
            src={waves}
            alt="waves"
            customStyles="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            height={352}
            width={1440}
          />
          <Title level="1" className="mb-2.5 text-center">
            {title}
          </Title>
          {content && <div className="text-xsm">{parse(content)}</div>}
        </div>
      </section>
      {blocks && <BlockManager blocks={blocks} />}
    </main>
  );
}
