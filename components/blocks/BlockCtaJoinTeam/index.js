'use client';

import React, { useCallback, useState } from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { buttonPropTypes, mediaPropTypes } from '@/lib/types';

import JoinTeamModal from '@/blocks/JoinTeamModal';
import Button from '@/elements/Button';
import Portal from '@/elements/Portal';
import { getStrapiMedia } from '@/utils';

const BlockJoinTeam = ({ title, shortDescription, button, coverImage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <section className="mb-28 sm:mb-44 2xl:mb-64">
      <div className="grid grid-rows-2 items-stretch gap-y-3 2md:grid-cols-2 2md:grid-rows-1 2md:gap-x-5">
        <div className="bg-primary relative col-span-1 flex flex-col items-center justify-center gap-y-5 overflow-hidden rounded-[8px] px-4 sm:px-10 2md:order-2 lg:max-h-[832px] lg:max-w-[848px]">
          {title && (
            <h2 className="max-w-[312px] text-center text-2xl font-bold text-white sm:max-w-none sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {shortDescription && <p className="text-center text-sm text-white 2md:max-w-[477px]">{shortDescription}</p>}
          {button && <Button button={button} onClick={() => setShowModal(true)} />}
        </div>
        {coverImage && (
          <div className="relative col-span-1 overflow-hidden rounded-[10px] sm:rounded-[20px] 2md:order-1 lg:max-h-[832px] lg:max-w-[848px]">
            <Image
              width={848}
              height={832}
              alt={delve(coverImage, 'alternativeText')}
              src={getStrapiMedia(delve(coverImage, 'format.original.url'), '?format=webp')}
              className="h-full w-full object-cover object-center"
              quality={75}
            />
          </div>
        )}
      </div>
      {showModal && (
        <Portal>
          <JoinTeamModal closeModal={handleCloseModal} />
        </Portal>
      )}
    </section>
  );
};

BlockJoinTeam.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  button: PropTypes.shape(buttonPropTypes).isRequired,
  coverImage: PropTypes.shape(mediaPropTypes).isRequired,
};

export default BlockJoinTeam;
