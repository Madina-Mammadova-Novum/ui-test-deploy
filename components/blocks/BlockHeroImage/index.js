import delve from 'dlv';
import Image from 'next/image';

import { BlockHeroImagePropTypes } from '@/lib/types';

import { Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const BlockHeroImage = ({ title, coverImage, shortDescription }) => {
  return (
    <section className="relative py-[100px]">
      {coverImage && (
        <div className="absolute w-full h-full inset-0 -z-10">
          <Image
            width={1440}
            height={352}
            alt={delve(coverImage, 'alternativeText')}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={100}
          />
        </div>
      )}
      <div className="max-w-[800px] mx-auto">
        {title && (
          <Title level="1" className="text-white text-center mb-2.5">
            {title}
          </Title>
        )}
        {shortDescription && <p className="text-white text-xsm text-center">{shortDescription}</p>}
      </div>
    </section>
  );
};

BlockHeroImage.propTypes = BlockHeroImagePropTypes;

export default BlockHeroImage;
