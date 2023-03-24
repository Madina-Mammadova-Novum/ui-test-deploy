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
