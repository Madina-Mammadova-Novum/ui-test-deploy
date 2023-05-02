'use client';

import PropTypes from 'prop-types';

import { linkImagePropTypes } from '@/lib/types';

import { NextLink, Title } from '@/elements';
import { ContactUsForm } from '@/modules';
import { SocialNetworks } from '@/units';

const ContactUsBlock = ({ title, subTitle, shortDescription, phones, emails, address, schedule }) => {
  return (
    <section className="relative z-10 -mt-[188px] mb-[100px]">
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="rounded-base p-5 bg-white grid grid-cols-2 divide-x divide-gray-darker relative">
          <div className="pr-5 flex flex-col">
            <ContactUsForm />
          </div>
          <div className="pl-5">
            <iframe
              title="1981 Broadway, New York, NY 10023, US"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.40641506922!2d-73.9826815!3d40.7750785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588aabf0a4cf%3A0x55d5730645a7b36d!2zMTk4MSBCcm9hZHdheSwgTmV3IFlvcmssIE5ZIDEwMDIzLCDQodCo0JA!5e0!3m2!1sru!2sua!4v1683062196548!5m2!1sru!2sua"
              width="536"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-base w-full h-[400px]"
            />
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
                  {phones.map((phone) => (
                    <li>
                      <NextLink href={`tel:${phone}`} className="text-xsm mt-1">
                        {phone}
                      </NextLink>
                    </li>
                  ))}
                  {emails.map((email) => (
                    <li>
                      <NextLink href={`mailto:${email}`} className="text-xsm mt-1">
                        {email}
                      </NextLink>
                    </li>
                  ))}
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
