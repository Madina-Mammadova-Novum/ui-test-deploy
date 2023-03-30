import React from 'react';

// import delve from 'dlv';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

// import { LinkAsButton, NextImage, Title } from '@/elements';
// import { getStrapiMedia } from '@/utils';

const LetsTalkBlock = () => {
  return (
    <section className="relative py-24">
      {/* {ctaSingleImage.coverImage && ( */}
      {/*  <div className="absolute w-full h-full inset-0 -z-10"> */}
      {/*    <NextImage */}
      {/*      width={1440} */}
      {/*      height={410} */}
      {/*      alt={delve(ctaSingleImage.coverImage, 'alternativeText')} */}
      {/*      src={getStrapiMedia(delve(ctaSingleImage.coverImage, 'format.original.url'), '')} */}
      {/*      className="h-full w-full object-cover object-center" */}
      {/*      quality={75} */}
      {/*    /> */}
      {/*  </div> */}
      {/* )} */}
      {/* <div className="bg-white rounded-[10px] max-w-[500px] mx-auto py-8"> */}
      {/*  {ctaSingleImage.title && ( */}
      {/*    <Title component="h1" className="text-black text-center mb-2.5"> */}
      {/*      {ctaSingleImage.title} */}
      {/*    </Title> */}
      {/*  )} */}
      {/*  <div className="max-w-[300px] mx-auto"> */}
      {/*    {ctaSingleImage.shortDescription && <p className="text-black text-xsm text-center mb-5">{shortDescription}</p>} */}
      {/*    {ctaSingleImage.button && ( */}
      {/*      <LinkAsButton */}
      {/*        href={ctaSingleImage.button.path} */}
      {/*        buttonProps={{ */}
      {/*          variant: 'primary', */}
      {/*          size: 'large', */}
      {/*        }} */}
      {/*        customStyles="max-w-[115px] mx-auto" */}
      {/*        target={ctaSingleImage.button.target} */}
      {/*      > */}
      {/*        {ctaSingleImage.button.label} */}
      {/*      </LinkAsButton> */}
      {/*    )} */}
      {/*  </div> */}
      {/* </div> */}
    </section>
  );
};

LetsTalkBlock.propTypes = {
  ctaSingleImage: PropTypes.arrayOf({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    button: linkPropTypes,
    coverImage: mediaPropTypes,
  }).isRequired,
};

export default LetsTalkBlock;
