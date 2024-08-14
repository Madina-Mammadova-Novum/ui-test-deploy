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

  if (pageData === null) notFound();

  return (
    <main className={classnames(legal && 'legal-styles')}>
      {/* todo: example to use legal variable */}
      <section className="relative bg-gray-light pb-[195px] pt-[115px]">
        <div className="container mx-auto max-w-[1258px] px-6 3md:px-14">
          <NextImage
            alt="waves"
            height={352}
            quality={100}
            width={1440}
            src="/images/waves.jpg"
            customStyles="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />
          {content && <div className="heading-wrapper relative z-10 text-white">{parse(content)}</div>}
        </div>
      </section>
      <div className="space-y-[100px]">{blocks && <BlockManager blocks={blocks} />}</div>
    </main>
  );
}
