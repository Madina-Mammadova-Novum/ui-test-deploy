import classNames from 'classnames';
import parse from 'html-react-parser';
import { notFound, redirect } from 'next/navigation';
import PropTypes from 'prop-types';

import { legalPropAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { BlockManager } from '@/common';
import { NextImage } from '@/elements';
import { ROUTES } from '@/lib';
import { getHomePageData } from '@/services';
import { getEntityData } from '@/services/collectionType';

export async function generateMetadata({ params }) {
  const data = await getEntityData(params);
  return metaData(data);
}

export default async function Home({ params }) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';

  // Get the current pathname from params.slug
  const pathname = params?.slug ? `/${params.slug.join('/')}` : '/';

  // Only redirect to maintenance if not on contact-us or privacy-policy pages
  if (
    maintenanceMode &&
    pathname !== ROUTES.CONTACT_US &&
    pathname !== ROUTES.PRIVACY_POLICY &&
    !pathname.startsWith('/_next')
  ) {
    redirect('/maintenance'); // Redirect to the maintenance page
  }

  // Get legal content based on the language and locale provided in the params.params object
  const { legal } = legalPropAdapter({ params });

  const { pageData, blocks, content } = await getHomePageData({ params });

  if (pageData === null) notFound();

  const isAboutUs = pathname === '/about-us';
  const isContactUs = pathname === '/contact-us';

  return (
    <main className={classNames(legal && 'legal-styles')}>
      {/* todo: example to use legal variable */}
      <section
        className={`relative bg-gray-light ${isAboutUs || isContactUs ? 'pb-[158px] pt-[109px] md:pb-[172px] 3md:pb-[200px] 3md:pt-[101px]' : 'pb-[195px] pt-[115px]'}`}
      >
        <div className="container mx-auto max-w-[1258px] px-4 md:px-8 3md:px-14">
          {(isAboutUs || isContactUs) && (
            <div className="relative z-10 mb-8 md:mb-3 3md:mb-4">
              <p className="text-xs-sm text-white">
                Home <span className="text-[#FFFFFF99]">/</span>{' '}
                <span className="text-gray">{isAboutUs ? 'About Us' : 'Contact Us'}</span>
              </p>
            </div>
          )}
          <NextImage
            alt="waves"
            height={352}
            quality={100}
            width={1440}
            src="/images/waves.jpg"
            customStyles="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />
          {content && (
            <div className={`heading-wrapper relative z-10 ${isAboutUs || isContactUs ? 'text-center' : ''}`}>
              {parse(content)}
            </div>
          )}
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
