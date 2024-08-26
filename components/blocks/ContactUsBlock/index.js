'use client';

import PropTypes from 'prop-types';

import { linkImagePropTypes } from '@/lib/types';

import EnvelopeSvg from '@/assets/images/envelope.svg';
import { Title } from '@/elements';
import Map from '@/elements/Map';

const ContactUsBlock = ({ title, subTitle, shortDescription, address, emails, embedMap }) => {
  return (
    <section className="relative z-10 -mt-[188px] mb-[100px]">
      <div className="container mx-auto max-w-[1258px] px-6 3md:px-14">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="relative grid gap-4 divide-y divide-gray-darker rounded-base bg-white p-5 shadow-2xl md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col items-center justify-center md:pr-5">
            <div className="text-center">
              <EnvelopeSvg className="mb-4 fill-black" />
              <Title level={1} className="mb-2">
                Contact Us
              </Title>
              {emails && emails.length > 0 && (
                <a href={`mailto:${emails[0]}`} className="mt-2 inline-block text-blue-500 hover:underline">
                  {emails[0]}
                </a>
              )}
            </div>
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
