import ExternalLinkAltSVG from '@/assets/images/externalLinkAlt.svg';
import Logo from '@/assets/images/logo.svg';
import { Copyright, NextLink, Title } from '@/elements';
import { getLegalLinksData, getSocialLinksData } from '@/services';
import { getContactInfo, getFooterLinks } from '@/services/navigation';
import { FooterNavBlock, SocialNetworks } from '@/units';

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
        <NextLink href={`tel:${Phone}`} className="text-xsm">
          {Phone}
        </NextLink>
      </li>
    );
  };

  const printContactEmails = ({ Email }) => (
    <li key={Email}>
      <NextLink href={`mailto:${Email}`} className="text-xsm">
        {Email}
      </NextLink>
    </li>
  );

  return (
    <footer className="bg-white py-[30px]">
      <div className="container mx-auto max-w-[1258px] px-6 3md:px-14">
        <NextLink href="/">
          <Logo className="fill-black" />
        </NextLink>
        <div className="mt-[30px] flex flex-col gap-4 sm:flex-row 3md:gap-x-10">
          {Array.isArray(data) && data.length > 0 && data.map(printFooterLinks)}
          {legal?.length > 0 && <FooterNavBlock items={legal} title="Legal" />}
          <div className="w-[166px]">
            <Title level="5" className="title-main mb-4 text-gray">
              Address
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <p className="text-xsm">{address}</p>
              </li>
              <li>
                {mapLink && (
                  <NextLink
                    label={mapLink.label}
                    href={mapLink.path}
                    target={mapLink.target}
                    className="flex gap-x-1 whitespace-nowrap text-xsm font-medium"
                  >
                    {mapLink.label}
                    <ExternalLinkAltSVG viewBox="0 0 24 24" className="h-4 w-4 fill-black" />
                  </NextLink>
                )}
              </li>
            </ul>
          </div>
          <div className="w-40 md:ml-auto">
            <Title level="5" className="title-main mb-4 text-gray">
              contacts
            </Title>
            <ul className="space-y-2 text-black">
              {phones?.length > 0 && phones.map(printContactPhones)}
              {emails?.length && emails.map(printContactEmails)}
            </ul>
            <div className="my-4 flex gap-x-2.5">
              <SocialNetworks data={socials} />
            </div>
          </div>
        </div>
        <div className="border-grey-darker flex justify-between border-t pt-5 text-xsm">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
