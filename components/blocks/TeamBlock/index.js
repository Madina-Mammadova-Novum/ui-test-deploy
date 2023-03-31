import React from 'react';

import delve from 'dlv';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { authorPropTypes } from '@/lib/types';

import { HoverableIcon, NextImage, NextLink, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const TeamBlock = ({ title, subTitle, shortDescription, members }) => {
  return (
    <section>
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <Title className="mb-5 text-center text-black">{title}</Title>}
        {subTitle && subTitle}
        {shortDescription && shortDescription}
        {members ? (
          <div className="grid grid-cols-3 gap-5">
            {members.map(({ fullName, content, position, coverImage, socialLinks }) => {
              return (
                <div className="flex items-center flex-col mt-[60px] text-black shadow px-[30px] pb-[30px] bg-white rounded-[10px]">
                  {coverImage && (
                    <NextImage
                      alt={delve(coverImage, 'alternativeText')}
                      src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
                      height={120}
                      width={120}
                      className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
                    />
                  )}
                  {fullName && (
                    <Title component="h2" className="mb-1">
                      {fullName}
                    </Title>
                  )}
                  {position && (
                    <Title component="h4" className="font-semibold mb-1">
                      {delve(position, 'title')}
                    </Title>
                  )}
                  {socialLinks && (
                    <div className="flex gap-x-2.5 mb-2.5">
                      {socialLinks.map((link) => {
                        return (
                          <NextLink href={delve(link, 'path')} title={delve(link, 'title')}>
                            <HoverableIcon
                              className="border border-gray-darker rounded-md"
                              icon={
                                <NextImage
                                  alt={delve(link, 'title')}
                                  src={getStrapiMedia(delve(link, 'image.format.original.url'), '')}
                                  height={20}
                                  width={20}
                                />
                              }
                            />
                          </NextLink>
                        );
                      })}
                    </div>
                  )}
                  {content && <div className="text-xsm">{parse(content)}</div>}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

TeamBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  members: PropTypes.arrayOf(authorPropTypes),
};

export default TeamBlock;
