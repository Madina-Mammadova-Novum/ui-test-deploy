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
    <footer className="py-[30px] bg-white">
      <div className="container mx-auto px-6 3md:px-14 max-w-[1258px] ">
        <NextLink href="/">
          <Logo className="fill-black" />
        </NextLink>
        <div className="flex flex-col sm:flex-row mt-[30px] gap-4 3md:gap-x-10">
          {data?.length > 0 && data.map(printFooterLinks)}
          {legal?.length > 0 && <FooterNavBlock items={legal} title="Legal" />}
          <div className="w-[166px]">
            <Title level="5" className="title-main text-gray mb-4">
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
                    className="font-medium text-xsm flex gap-x-1 whitespace-nowrap"
                  >
                    {mapLink.label}
                    <ExternalLinkAltSVG viewBox="0 0 24 24" className="fill-black w-4 h-4" />
                  </NextLink>
                )}
              </li>
            </ul>
          </div>
          <div className="md:ml-auto w-40">
            <Title level="5" className="title-main text-gray mb-4">
              contacts
            </Title>
            <ul className="space-y-2 text-black">
              {phones?.length && phones.map(printContactPhones)}
              {emails?.length && emails.map(printContactEmails)}
            </ul>
            <div className="flex gap-x-2.5 my-4">
              <SocialNetworks data={socials} />
            </div>
          </div>
        </div>
        <div className="pt-5 text-xsm flex justify-between border-grey-darker border-t">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
