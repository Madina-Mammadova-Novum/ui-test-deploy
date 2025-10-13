import classNames from 'classnames';
import parse from 'html-react-parser';
import { notFound, redirect } from 'next/navigation';
import PropTypes from 'prop-types';

import { legalPropAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import SmallLogo from '@/assets/images/logo-sm.svg';
import { BlockManager } from '@/common';
import { NextImage } from '@/elements';
import { ROUTES } from '@/lib';
import { getHomePageData } from '@/services';
import { getEntityData } from '@/services/collectionType';

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getEntityData(params);
  return metaData(data);
}

export default async function Home(props) {
  const params = await props.params;
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';
  const betaMode = process.env.NEXT_PUBLIC_BETA_MODE === 'true' && process.env.APP_ENV === 'prod';

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
  const isHome = pathname === '/';

  const aboutUsContent = (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 md:max-w-[584px] md:gap-y-6 3md:max-w-[572px]">
      <div className="flex items-center justify-center gap-x-3">
        <SmallLogo className="fill-white" />
        <h1>About Us</h1>
      </div>
      <p className="text-xsm text-white">
        Ship.Link is a web-based vessel chartering platform designed to streamline spot charters. Charterers can
        instantly find vessels that match their{' '}
        <span className="font-semibold !leading-[1.4] text-white">
          load port, cargo type, and laycan using our advanced search engine. Shipowners can list vessel positions in
          one central location
        </span>
        , gaining global visibility without relying on multiple brokers.
      </p>
    </div>
  );
  return (
    <main className={classNames({ 'legal-styles': legal })}>
      {/* todo: example to use legal variable */}
      <section
        className={classNames('relative bg-gray-light', {
          'pb-[158px] pt-[109px] md:pb-[172px] 3md:pb-[200px] 3md:pt-[101px]': isContactUs,
          'pb-16 pt-[109px] md:pb-[4.25rem] 3md:pb-24 3md:pt-[101px]': isAboutUs,
          'custom-hero pb-[158px] pt-[121px] 3md:pb-[289px] 3md:pt-[129px]': isHome && !betaMode,
          'custom-hero pb-[80px] pt-[121px] 3md:pb-[96px] 3md:pt-[129px]': isHome && betaMode,
          'pb-[195px] pt-[115px]': !isContactUs && !isAboutUs && !isHome,
        })}
      >
        <div className="container mx-auto max-w-[1152px] px-4 md:px-8 xl:px-0">
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
            src="https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/pageimages/dark_waves_1x.webp"
            customStyles="absolute inset-0 z-0 h-full w-full object-fill object-center"
          />
          {content && (
            <div
              className={classNames('heading-wrapper relative', {
                'text-center': isAboutUs || isContactUs,
                'flex items-center justify-center': isAboutUs,
                'max-w-md': isHome,
              })}
            >
              {isAboutUs ? aboutUsContent : parse(content)}
            </div>
          )}
        </div>
      </section>
      <div>{blocks && <BlockManager blocks={blocks} />}</div>
    </main>
  );
}

Home.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  params: PropTypes.any.isRequired,
};
