import Image from 'next/image';

import { NextImagePropTypes } from '@/lib/types';

const NextImage = ({ src, alt, width, height, customStyles = '', ...rest }) => {
  return <Image src={src} alt={alt} width={width} height={height} className={customStyles} {...rest} />;
};

NextImage.propTypes = NextImagePropTypes;

export default NextImage;
