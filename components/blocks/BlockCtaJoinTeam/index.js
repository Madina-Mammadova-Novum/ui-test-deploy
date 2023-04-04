'use client';

import React, { useCallback, useState } from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { buttonPropTypes, mediaPropTypes } from '@/utils/types';

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
    <section className="mb-28 sm:mb-44 2lg:mb-64">
      <div className="grid grid-rows-2 items-stretch gap-y-3 2sm:grid-rows-1 2sm:grid-cols-2 2sm:gap-x-5">
        <div className="col-span-1 relative flex flex-col justify-center items-center gap-y-5 px-4 bg-primary rounded-[8px] sm:px-10 2sm:order-2 lg:max-w-[848px] lg:max-h-[832px] overflow-hidden">
          {title && (
            <h2 className=" text-white text-2xl font-bold text-center max-w-[312px] sm:text-4xl sm:max-w-none md:text-5xl">
              {title}
            </h2>
          )}
          {shortDescription && <p className="text-white text-sm text-center 2sm:max-w-[477px]">{shortDescription}</p>}
          {button && <Button button={button} onClick={() => setShowModal(true)} />}
        </div>
        {coverImage && (
          <div className=" col-span-1 relative rounded-[10px] sm:rounded-[20px] 2sm:order-1 lg:max-w-[848px] lg:max-h-[832px] overflow-hidden">
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
