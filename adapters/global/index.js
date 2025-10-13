import delve from 'dlv';

import { imageAdapter } from '@/adapters/image';

export const linkAdapter = (link) => {
  if (!link || !link.path) {
    return null;
  }

  let linkOptions = delve(link, 'linkOptions');
  const label = delve(link, 'label');
  const path = delve(link, 'path');

  if (!linkOptions) {
    linkOptions = {
      style: 'default',
      target: null,
      isExternal: false,
      rel: null,
    };
  }

  const { style = 'default', target = null, isExternal = false, rel = null } = linkOptions;

  return {
    label,
    path,
    type: style,
    target,
    isExternal,
    rel,
  };
};

export const linkImageAdapter = (link) => {
  const { coverImage } = link;
  return {
    ...linkAdapter(link),
    coverImage: imageAdapter(coverImage),
  };
};
