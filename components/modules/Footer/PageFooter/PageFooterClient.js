'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import ExternalLinkAltSVG from '@/assets/images/externalLinkAlt.svg';
import Logo from '@/assets/images/logo.svg';
import { Copyright, NextLink } from '@/elements';
import { FooterNavBlock, SocialNetworks } from '@/units';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

const PageFooterClient = ({ data = [], socials = [], legal = [], address, phones = [], emails = [], mapLink }) => {
  const printFooterLinks = ({ title, items, id }) => {
    return <FooterNavBlock key={id} items={items} title={title} />;
  };

  const printContactPhones = ({ Phone }) => {
    return (
      <li key={Phone}>
        <NextLink href={`tel:${Phone}`} className="text-xsm font-medium">
          {Phone}
        </NextLink>
      </li>
    );
  };

  const printContactEmails = ({ Email }) => (
    <li key={Email}>
      <NextLink href={`mailto:${Email}`} className="text-xsm font-medium text-blue underline">
        {Email}
      </NextLink>
    </li>
  );

  return (
    <InAppChecker>
      <footer className="bg-white py-8">
        <div className="container mx-auto mt-4 max-w-6xl px-4 md:mt-6 md:px-8 3md:mt-8 xl:px-0">
          <div className="flex flex-col-reverse gap-12 pb-8 md:flex-row md:justify-between 3md:items-center">
            <div className="flex flex-col gap-y-6 md:gap-y-8">
              <NextLink href="/" prefetch>
                <Logo className="fill-black" />
              </NextLink>

              <div className="flex flex-col gap-y-2">
                <ul className="space-y-2 text-black">
                  {emails?.length && emails.map(printContactEmails)}
                  {phones?.length > 0 && phones.map(printContactPhones)}
                </ul>

                <div className="flex w-[15.625rem] gap-1 md:w-56 3md:w-auto">
                  <p className="text-xsm font-medium text-black">{address}</p>
                  {mapLink && (
                    <NextLink
                      label={mapLink.label}
                      href={mapLink.path}
                      target={mapLink.target}
                      className="flex gap-x-1 whitespace-nowrap text-xsm font-medium"
                    >
                      <ExternalLinkAltSVG viewBox="0 0 24 24" className="h-4 w-4 fill-blue" />
                    </NextLink>
                  )}
                </div>
              </div>

              <div className="flex gap-x-2">
                <SocialNetworks data={socials} />
              </div>
            </div>

            <div className="flex gap-8 3md:gap-16">
              {Array.isArray(data) && data.length > 0 && data.map(printFooterLinks)}
              {legal?.length > 0 && <FooterNavBlock items={legal} title="Legal" />}
            </div>
          </div>

          <div className="border-grey-darker flex flex-wrap justify-between gap-2 border-t pt-8 text-xsm">
            <Copyright />
            <p className="text-gray">ShipLink Ltd. is a member of Emirates Shipping Association</p>
          </div>
        </div>
      </footer>
    </InAppChecker>
  );
};

PageFooterClient.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
    })
  ),
  socials: PropTypes.array,
  legal: PropTypes.array,
  address: PropTypes.string,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      Phone: PropTypes.string.isRequired,
    })
  ),
  emails: PropTypes.arrayOf(
    PropTypes.shape({
      Email: PropTypes.string.isRequired,
    })
  ),
  mapLink: PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default PageFooterClient;
