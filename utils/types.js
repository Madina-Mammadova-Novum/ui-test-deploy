import PropTypes from 'prop-types';

import { STYLES } from '@/lib/constants';

export const mediaPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  attributes: PropTypes.shape({
    alternativeText: PropTypes.string,
    mime: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
});

export const linkOptionsPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  target: PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']),
  style: PropTypes.oneOf(STYLES),
  rel: PropTypes.oneOf([null, 'noopener noreferrer', 'noopener', 'noreferrer']),
  isExternal: PropTypes.bool,
});

export const linkPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(STYLES),
  linkOptions: linkOptionsPropTypes,
});

export const linkImagePropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(STYLES),
  image: mediaPropTypes,
  linkOptions: linkOptionsPropTypes,
});

export const buttonPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  buttonOptions: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.oneOf([STYLES]),
  }),
};

export const valuePropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    valueType: PropTypes.string,
    coverImage: mediaPropTypes,
  }),
});
export const valuesPropTypes = PropTypes.arrayOf(valuePropTypes);

export const navigationPropTypes = PropTypes.shape({
  mainNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      menuAttached: PropTypes.bool,
      order: PropTypes.number,
      path: PropTypes.string,
      type: PropTypes.string,
      uiRouterKey: PropTypes.string,
      slug: PropTypes.string,
      external: PropTypes.bool,
    })
  ),
});

export const globalPropTypes = PropTypes.shape({
  howItWorkBlock: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    values: valuesPropTypes,
  }),
  navigation: navigationPropTypes,
  footer: PropTypes.shape({}),
});

export const metaPropTypes = PropTypes.shape({
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pageCount: PropTypes.number,
    total: PropTypes.number,
  }),
});

export const categoryPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

export const iconPropTypes = {
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};
