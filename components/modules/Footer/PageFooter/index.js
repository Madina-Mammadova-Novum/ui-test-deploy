import dynamic from 'next/dynamic';

import ExternalLinkAltSVG from '@/assets/images/externalLinkAlt.svg';
import Logo from '@/assets/images/logo.svg';
import { Copyright, NextLink } from '@/elements';
import { getLegalLinksData, getSocialLinksData } from '@/services';
import { getContactInfo, getFooterLinks } from '@/services/navigation';
import { FooterNavBlock, SocialNetworks } from '@/units';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

export default async function PageFooter() {
  const { data } = await getFooterLinks();
  const { socials } = await getSocialLinksData();
  const { legal } = await getLegalLinksData();

  const { address, phones, emails, mapLink } = await getContactInfo();

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
              <NextLink href="/">
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

          <div className="border-grey-darker flex justify-between border-t pt-8 text-xsm">
            <Copyright />
          </div>
        </div>
      </footer>
    </InAppChecker>
  );
}
