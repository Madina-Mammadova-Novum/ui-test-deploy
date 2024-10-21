import classNames from 'classnames';
import parse from 'html-react-parser';
import { notFound, redirect } from 'next/navigation';
import PropTypes from 'prop-types';

import { legalPropAdapter } from '@/adapters';
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
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';

  if (maintenanceMode) {
    redirect('/maintenance'); // Redirect to the maintenance page
  }

  // Get legal content based on the language and locale provided in the params.params object
  const { legal } = legalPropAdapter({ params });

  const { pageData, blocks, content } = await getHomePageData({ params });

  if (pageData === null) notFound();

  return (
    <main className={classNames(legal && 'legal-styles')}>
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

Home.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  params: PropTypes.any.isRequired,
};
