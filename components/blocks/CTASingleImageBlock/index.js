import delve from 'dlv';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/lib/types';

import { LinkAsButton, NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const CTASingleImageBlock = ({ title, shortDescription, coverImage, button }) => {
  return (
    <section className="relative py-24">
      {coverImage && (
        <div className="absolute inset-0 -z-10 h-full w-full">
          <NextImage
            priority
            width={1440}
            height={410}
            alt={delve(coverImage, 'alternativeText') || 'Cover Image'}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={100}
          />
        </div>
      )}
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
    </section>
  );
};

CTASingleImageBlock.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  button: linkPropTypes,
  coverImage: mediaPropTypes,
};

export default CTASingleImageBlock;
