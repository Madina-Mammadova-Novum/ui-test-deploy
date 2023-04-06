import PropTypes from 'prop-types';

import { BUTTON_SIZES, STYLES } from '@/lib/constants';

/**
 * re
 */
export const navBarPropTypes = {
  placeholder: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  contrasted: PropTypes.bool,
};

export const linkTargetPropTypes = PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']);
export const buttonVariantsPropTypes = PropTypes.oneOf(STYLES);
export const buttonSizesPropTypes = PropTypes.oneOf(BUTTON_SIZES);

export const authorPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  fullName: PropTypes.string,
  content: PropTypes.string,
  phoneNumber: PropTypes.string,
  // tags,
  // email: PropTypes.string,
  // coverImage: coverImage ? imageAdapter(coverImage) : null,
  // gallery: gallery ? imagesAdapter(gallery) : null,
  // contactLink: PropTypes.arrayOf(PropTypes.shape({})),
  // socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
});

export const categoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  coverImage: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    attributes: PropTypes.shape({
      alternativeText: PropTypes.string,
      mime: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  }),
});
