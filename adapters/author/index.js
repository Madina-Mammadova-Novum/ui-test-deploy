import { authorPositionAdapter } from '@/adapters/authorPosition';
import { linkImageAdapter } from '@/adapters/global';
import { imageAdapter, imagesAdapter } from '@/adapters/image';

export const authorAdapter = ({ data = null } = {}) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const {
    firstName,
    lastName,
    content,
    phoneNumber,
    tags,
    title,
    email,
    coverImage,
    gallery,
    contactLink,
    socialLinks,
    authorPosition,
    publishedAt,
  } = attributes;
  const links = socialLinks ? socialLinks.map((link) => linkImageAdapter(link)) : [];

  return {
    id,
    title,
    firstName,
    lastName,
    fullName: `${firstName || ''} ${lastName || ''}`,
    content,
    phoneNumber,
    tags,
    email,
    coverImage: coverImage ? imageAdapter(coverImage) : null,
    gallery: gallery ? imagesAdapter(gallery) : null,
    contactLink,
    socialLinks: links || null,
    position: authorPosition ? authorPositionAdapter(authorPosition) : null,
    publishedAt,
  };
};

export const authorsAdapter = ({ data } = {}) => {
  if (!data) return [];
  return data.map((author) => {
    return authorAdapter({ data: author });
  });
};
