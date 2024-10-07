import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/lib/types';

import { Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const BlockHeroImage = ({ title, coverImage, shortDescription }) => {
  return (
    <section className="relative py-[100px]">
      {coverImage && (
        <div className="absolute inset-0 -z-10 h-full w-full">
          <Image
            priority
            width={1440}
            height={352}
            alt={delve(coverImage, 'alternativeText') || 'Cover Image'}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={100}
          />
        </div>
      )}
      <div className="mx-auto max-w-[800px]">
        {title && (
          <Title level="1" className="mb-2.5 text-center text-white">
            {title}
          </Title>
        )}
        {shortDescription && <p className="text-center text-xsm text-white">{shortDescription}</p>}
      </div>
    </section>
  );
};

BlockHeroImage.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  coverImage: PropTypes.shape(mediaPropTypes).isRequired,
};

export default BlockHeroImage;
