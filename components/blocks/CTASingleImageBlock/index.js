import delve from 'dlv';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/lib/types';

import { LinkAsButton, NextImage, Title, VideoPlayer } from '@/elements';
import { getStrapiMedia } from '@/utils';

const CTASingleImageBlock = ({
  title,
  shortDescription,
  coverImage,
  button,
  videoSrc = 'https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/introvideo/Introduction%20video.mp4',
}) => {
  return (
    <section className="relative pb-20">
      {coverImage && (
        <div className="absolute inset-0 -z-10 h-full w-full">
          <NextImage
            priority
            width={1440}
            height={410}
            alt={delve(coverImage, 'alternativeText') || 'Default Cover Image'}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={100}
          />
        </div>
      )}
      <div className="mx-auto max-w-[1258px] gap-8 rounded-b-base px-6 3md:px-14">
        <div className="mb-10 w-full overflow-hidden rounded-b-base shadow-xl">
          <VideoPlayer src={videoSrc} preload="metadata" className="w-full" captionSrc="/captions/shiplink.vtt" />
        </div>

        <div className="mx-auto max-w-[500px] rounded-base bg-white py-8">
          {title && (
            <Title level="1" className="mb-2.5 text-center text-black">
              {title}
            </Title>
          )}
          <div className="mx-auto max-w-[300px]">
            {shortDescription && <p className="mb-5 text-center text-xsm text-black">{shortDescription}</p>}
            {button && (
              <LinkAsButton
                href={button.path}
                buttonProps={{
                  variant: 'primary',
                  size: 'large',
                }}
                customStyles="max-w-[115px] mx-auto"
                target={button.target}
              >
                {button.label}
              </LinkAsButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

CTASingleImageBlock.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  button: linkPropTypes,
  coverImage: mediaPropTypes,
  videoSrc: PropTypes.string,
};

export default CTASingleImageBlock;
