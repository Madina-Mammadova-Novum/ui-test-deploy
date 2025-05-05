'use client';

import PropTypes from 'prop-types';

import { linkImagePropTypes } from '@/lib/types';

import { Title } from '@/elements';
import Map from '@/elements/Map';
import { ContactUsForm } from '@/modules';

const ContactUsBlock = ({ title, subTitle, shortDescription, address, emails, embedMap }) => {
  return (
    <section className="relative z-10 -mt-[188px]">
      <div className="3md:mx-auto 3md:max-w-[36.5rem]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="px-4 pt-5 md:px-8 md:pl-5 md:pt-0 3md:px-14">
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
            {emails && emails.length > 0 && (
              <a href={`mailto:${emails[0]}`} className="mt-2 inline-block text-blue-500 hover:underline">
                {emails[0]}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-medium flex flex-col items-center gap-8 px-4 pb-[5.75rem] pt-16 md:px-8 md:pb-[8.25rem] md:pt-20 3md:px-14 3md:py-24">
        <Title className="text-[1.875rem] leading-[1.4]" level="2">
          Write to Us
        </Title>

        <ContactUsForm />
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
