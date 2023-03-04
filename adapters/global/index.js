import { imageAdapter } from '@/adapters/image';
import { valueAdapter } from '@/adapters/value';
import { formatDate } from '@/utils/helpers';

export const howItWorkBlockAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, shortDescription, values } = attributes;

  return {
    title,
    shortDescription,
    subTitle: '',
    values: values.map(({ id, value }) => {
      return {
        id,
        value: valueAdapter(value),
      };
    }),
  };
};

export const whyWeAreBetterBlockAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, subTitle, shortDescription, values } = attributes;

  return {
    title,
    shortDescription,
    subTitle,
    values: values.map(({ id, value }) => {
      return {
        id,
        value: valueAdapter(value),
      };
    }),
  };
};

export const linkAdapter = (link) => {
  const { linkOptions } = link;
  const type = linkOptions?.style !== null && linkOptions?.style !== undefined ? linkOptions?.style : 'default';
  return {
    ...link,
    type,
  };
};

export const linkImageAdapter = (link) => {
  const { linkOptions, coverImage } = link;
  const type = linkOptions?.style !== null && linkOptions?.style !== undefined ? linkOptions?.style : 'default';
  return {
    ...link,
    type,
    image: imageAdapter(coverImage),
  };
};

export const ctaFeaturedAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, subTitle, shortDescription, button, coverImage, additionalImage } = attributes;

  return {
    title,
    subTitle,
    shortDescription,
    button,
    images: [imageAdapter(coverImage), imageAdapter(additionalImage)],
  };
};

export const ctaJoinTeamAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, subTitle, shortDescription, button, coverImage } = attributes;

  return {
    title,
    subTitle,
    shortDescription,
    button,
    coverImage: imageAdapter(coverImage),
  };
};

export const footerNavigationAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { links } = attributes;

  return {
    coverImage: imageAdapter(attributes.coverImage),
    links: links.map((link) => linkImageAdapter(link)),
  };
};

export const registrationContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, description, coverImage } = attributes;

  return {
    title,
    description,
    coverImage: imageAdapter(coverImage),
  };
};

export const registrationSuccessContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, description, coverImage } = attributes;

  return {
    title,
    description,
    coverImage: imageAdapter(coverImage),
  };
};

export const setNewPasswordContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, description, coverImage } = attributes;

  return {
    title,
    description,
    coverImage: imageAdapter(coverImage),
  };
};

export const loginContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, description, coverImage } = attributes;

  return {
    title,
    description,
    coverImage: imageAdapter(coverImage),
  };
};

export const forgotPasswordContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, description, coverImage } = attributes;

  return {
    title,
    description,
    coverImage: imageAdapter(coverImage),
  };
};

export const footerAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { privacyLink, socials } = attributes;

  return {
    privacyLink,
    socials: socials.map((link) => linkImageAdapter(link)),
  };
};

export const headerAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { buttons } = attributes;

  if (buttons.length === 0) return [];

  return {
    buttons: buttons.map((button) => linkAdapter(button)),
  };
};

export const privacyPolicyContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, updatedAt, content } = attributes;

  return {
    title,
    lastUpdated: formatDate(updatedAt),
    content,
  };
};

export const consentContentAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { title, updatedAt, content } = attributes;

  return {
    title,
    lastUpdated: formatDate(updatedAt),
    content,
  };
};

export const contactInformationAdapter = ({ data }) => {
  if (data === null) return null;
  const { attributes } = data;
  const { phone, email } = attributes;

  return {
    phone,
    email,
  };
};
