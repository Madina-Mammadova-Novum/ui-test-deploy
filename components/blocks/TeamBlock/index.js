'use client';

import React from 'react';

import PropTypes from 'prop-types';

import FacebookSVG from '@/assets/images/facebook.svg';
import LinkedinSVG from '@/assets/images/linkedin.svg';
import TwitterSVG from '@/assets/images/twitter.svg';
import waves from '@/assets/images/waves.jpg';
import { HoverableIcon, NextImage, NextLink, Title } from '@/elements';

const TeamBlock = ({ title }) => {
  return (
    <section>
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <Title className="mb-5 text-center text-black">{title}</Title>}
        <div className="grid grid-cols-3 gap-5">
          <div className="flex items-center flex-col mt-[60px] text-black shadow px-[30px] pb-[30px] bg-white rounded-[10px]">
            <NextImage
              src={waves}
              alt={waves}
              height={120}
              width={120}
              className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
            />
            <Title component="h2" className="mb-1">
              fullName
            </Title>
            <Title component="h4" className="font-semibold mb-1">
              position
            </Title>
            <div className="flex gap-x-2.5 mb-2.5">
              <NextLink href="#">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<LinkedinSVG />} />
              </NextLink>
              <NextLink href="#">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<TwitterSVG />} />
              </NextLink>
              <NextLink href="#">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<FacebookSVG />} />
              </NextLink>
            </div>
            <p className="text-xsm">
              Nor is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but
              occasionally circumstances occur in which toil and pain can procure him some great pleasure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

TeamBlock.propTypes = {
  title: PropTypes.string,
  // members: PropTypes.arrayOf(),
};

export default TeamBlock;
