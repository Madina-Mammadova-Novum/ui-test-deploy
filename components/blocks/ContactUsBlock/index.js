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
      <NextLink href={`tel:${phone}`} className="text-xsm mt-1">
        {phone}
      </NextLink>
    </li>
  );

  const printEmail = (email) => (
    <li>
      <NextLink href={`mailto:${email}`} className="text-xsm mt-1">
        {email}
      </NextLink>
    </li>
  );
  return (
    <section className="relative z-10 -mt-[188px] mb-[100px]">
      <div className="container mx-auto px-6 3md:px-14 max-w-[1258px]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="rounded-base p-5 bg-white grid md:grid-cols-2 md:divide-x divide-y md:divide-y-0 gap-4 divide-gray-darker relative">
          <div className="md:pr-5 flex flex-col">
            <ContactUsForm />
          </div>
          <div className="md:pl-5 pt-5 md:pt-0">
            <Map embedMap={embedMap} title={address} />
            <div className="flex flex-wrap gap-x-[30px] mt-5">
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
              <div className="w-[330px] md:w-[150px] text-xsm">
                <Title level={4} className="mb-2">
                  Schedule
                </Title>
                <div className="flex flex-row md:flex-col gap-[30px] md:gap-5">
                  <p>{schedule}</p>
                  <SocialNetworks />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-base  h-[calc(100%_-_188px)] w-full absolute shadow-xmd bottom-0 -z-10" />
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
