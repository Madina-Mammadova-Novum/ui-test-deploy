'use client';

import PropTypes from 'prop-types';

import { linkImagePropTypes } from '@/lib/types';

import { NextLink, Title } from '@/elements';
import Map from '@/elements/Map';
import { ContactUsForm } from '@/modules';
import { SocialNetworks } from '@/units';

const ContactUsBlock = ({ title, subTitle, shortDescription, phones, emails, address, schedule, embedMap }) => {
  const printPhone = (phone) => (
    <li>
      <NextLink href={`tel:${phone}`} className="mt-1 text-xsm">
        {phone}
      </NextLink>
    </li>
  );

  const printEmail = (email) => (
    <li>
      <NextLink href={`mailto:${email}`} className="mt-1 text-xsm">
        {email}
      </NextLink>
    </li>
  );
  return (
    <section className="relative z-10 -mt-[188px] mb-[100px]">
      <div className="container mx-auto max-w-[1258px] px-6 3md:px-14">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="relative grid gap-4 divide-y divide-gray-darker rounded-base bg-white p-5 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col md:pr-5">
            <ContactUsForm />
          </div>
          <div className="pt-5 md:pl-5 md:pt-0">
            <Map embedMap={embedMap} title={address} />
            <div className="mt-5 flex flex-wrap gap-[30px]">
              <div className="w-[150px]">
                <Title level={4} className="mb-2">
                  Address
                </Title>
                <ul className="space-y-2 text-black">
                  <li>
                    <p className="text-xsm">{address}</p>
                  </li>
                </ul>
              </div>
              <div className="w-[150px]">
                <Title level={4} className="mb-2">
                  Contacts
                </Title>
                <ul>
                  {phones && phones.map(printPhone)}
                  {emails && emails.map(printEmail)}
                </ul>
              </div>
              <div className="w-[330px] text-xsm md:w-[150px]">
                <Title level={4} className="mb-2">
                  Schedule
                </Title>
                <div className="flex flex-row gap-[30px] md:flex-col md:gap-5">
                  <p>{schedule}</p>
                  <SocialNetworks />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 -z-10 h-[calc(100%_-_188px)] w-full rounded-base shadow-xmd" />
        </div>
      </div>
    </section>
  );
};

ContactUsBlock.propTypes = {
  embedMap: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  phones: PropTypes.arrayOf(PropTypes.string),
  emails: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
  schedule: PropTypes.string,
  socialLinks: PropTypes.arrayOf(linkImagePropTypes),
};

export default ContactUsBlock;
