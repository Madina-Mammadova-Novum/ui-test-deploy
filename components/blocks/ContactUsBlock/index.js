'use client';

import PropTypes from 'prop-types';

import { linkImagePropTypes } from '@/lib/types';

import MapMarker from '@/assets/images/mapMarker.svg';
import Phone from '@/assets/images/phone.svg';
import { Title } from '@/elements';
import Map from '@/elements/Map';
import { ContactUsForm } from '@/modules';

const ContactUsBlock = ({ address, emails, embedMap, phones }) => {
  return (
    <section className="relative z-10 -mt-[126px] md:-mt-[140px] 3md:-mt-[152px]">
      <div className="flex flex-col items-center gap-8 px-4 pb-16 md:px-8 md:pb-20 3md:mx-auto 3md:max-w-[36.5rem] 3md:gap-12 3md:pb-24">
        <Map embedMap={embedMap} title={address} className="!h-[226px] md:!h-[328px] md:w-[36.5rem] 3md:w-[35.75rem]" />
        <div className="flex max-w-[22.375rem] gap-4">
          <div className="flex w-1/2 flex-col items-center">
            <div className="mb-6 flex items-center justify-center rounded-md border border-blue/20 p-2">
              <MapMarker className="fill-blue" />
            </div>
            <Title level={4} className="mb-2 font-semibold">
              Address
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <p className="text-center text-xsm">{address}</p>
              </li>
            </ul>
          </div>

          <div className="flex w-1/2 flex-col items-center">
            <div className="mb-6 flex items-center justify-center rounded-md border border-blue/20 p-2">
              <Phone className="fill-blue" />
            </div>
            <Title level={4} className="mb-2 font-semibold">
              Contact
            </Title>
            {emails && emails.length > 0 && (
              <a href={`mailto:${emails[0]}`} className="inline-block text-xsm font-medium text-blue hover:underline">
                {emails[0]}
              </a>
            )}
            {phones && phones.length > 0 && (
              <a href={`tel:${phones[0]}`} className="inline-block text-xsm font-medium text-black">
                {phones[0]}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 bg-gray-medium px-4 pb-[5.75rem] pt-16 md:px-8 md:pb-[8.25rem] md:pt-20 3md:gap-12 3md:py-24">
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
  phones: PropTypes.arrayOf(PropTypes.string),
  emails: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
  schedule: PropTypes.string,
  socialLinks: PropTypes.arrayOf(linkImagePropTypes),
};

export default ContactUsBlock;
