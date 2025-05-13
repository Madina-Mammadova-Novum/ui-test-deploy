import delve from 'dlv';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/lib/types';

import EnvelopeAltSVG from '@/assets/images/envelopeAlt.svg';
import { LinkAsButton, NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const CTASingleImageBlock = ({ title, shortDescription, coverImage, button }) => {
  return (
    <section className="relative pb-[5.75rem] pt-16 md:pb-[8.25rem] md:pt-20 3md:py-24">
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
      <div className="mx-auto gap-8 rounded-b-base px-4 md:mx-auto md:max-w-[485px] md:px-0">
        <div className="flex flex-col items-center justify-center rounded-base bg-white p-10">
          <div className="mb-4 flex size-11 items-center rounded-md border border-blue/20 p-2">
            <EnvelopeAltSVG className="fill-blue" />
          </div>
          {title && (
            <Title level="1" className="mb-0.5 text-center text-black">
              {title}
            </Title>
          )}
          <div className="mx-auto max-w-[405px]">
            {shortDescription && <p className="mb-7 text-center text-xsm text-black">{shortDescription}</p>}
            {button && (
              <LinkAsButton
                href={button.path}
                buttonProps={{
                  variant: 'primary',
                  size: 'large',
                }}
                customStyles="md:max-w-[115px] mx-auto"
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
