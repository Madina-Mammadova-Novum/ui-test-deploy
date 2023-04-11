'use client';

import React from 'react';

import PropTypes from 'prop-types';

import FacebookSVG from "@/assets/images/facebook.svg";
import LinkedinSVG from "@/assets/images/linkedin.svg";
import TwitterSVG from "@/assets/images/twitter.svg";
import { HoverableIcon, NextLink, Title } from "@/elements";
import { ContactUsForm } from "@/modules";

const ContactUsBlock = ({ title, subTitle, shortDescription }) => {

  return (
    <section className="relative z-10 -mt-[175px] mb-[100px]">
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <div className="rounded-[10px] p-5 bg-white grid grid-cols-2 divide-x divide-gray-darker">
          <div className="pr-5">
            <Title level={2} className="mb-5">Write to us</Title>
            <ContactUsForm/>
          </div>
          <div className="pl-5">
              <iframe
                title='map'
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d95271.13436975016!2d30.457874967403615!3d50.490820156839895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps!5e0!3m2!1sen!2sua!4v1681135861029!5m2!1sen!2sua"
                width="536" height="400" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[10px] w-full h-[400px]"
              />
            <div className="flex flex-wrap gap-x-[30px] mt-5">
              <div className="w-[150px]">
                <Title level={4} className="mb-2">
                  Address
                </Title>
                <ul className="space-y-2 text-black">
                  <li>
                    <p className="text-xsm">1981 Broadway, New York, NY 10023, United States</p>
                  </li>
                </ul>
              </div>
              <div className="w-[150px]">
                <Title level={4} className="mb-2">
                  Contacts
                </Title>
                <ul>
                  <li>
                    <NextLink href="#" className="text-xsm mt-1">
                      + 1 212-444-3400
                    </NextLink>
                  </li>
                  <li>
                    <NextLink href="#" className="text-xsm mt-1">
                      + 1 212-444-3400
                    </NextLink>
                  </li>
                  <li>
                    <NextLink href="#" className="text-xsm mt-2">
                      hello@ship.link.com
                    </NextLink>
                  </li>
                </ul>
              </div>
              <div className="w-[330px] 3sm:w-[150px] text-xsm">
                <Title level={4} className="mb-2">
                  Schedule
                </Title>
                <div className="flex flex-row 3sm:flex-col gap-[30px] 3sm:gap-5">
                  <p>Monday to Friday
                    8:00 AM - 5:00 PM</p>
                  <div className="flex gap-x-2.5">
                    <NextLink href="/">
                      <HoverableIcon className="border border-gray-darker rounded-md" icon={<LinkedinSVG />} />
                    </NextLink>
                    <NextLink href="/">
                      <HoverableIcon className="border border-gray-darker rounded-md" icon={<TwitterSVG />} />
                    </NextLink>
                    <NextLink href="/">
                      <HoverableIcon className="border border-gray-darker rounded-md" icon={<FacebookSVG />} />
                    </NextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactUsBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
};

export default ContactUsBlock;
