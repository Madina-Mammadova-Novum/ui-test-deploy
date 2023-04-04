import { authorPositionAdapter } from '@/adapters/authorPosition';
import { linkImageAdapter } from '@/adapters/global';
import { imageAdapter, imagesAdapter } from '@/adapters/image';

export const authorAdapter = ({ data }) => {
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
  } = attributes;
  const links = socialLinks ? socialLinks.map((link) => linkImageAdapter(link)) : [];

  return {
    id,
    title,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    content,
    phoneNumber,
    tags,
    email,
    coverImage: coverImage ? imageAdapter(coverImage) : null,
    gallery: gallery ? imagesAdapter(gallery) : null,
    contactLink,
    socialLinks: links || null,
    position: authorPosition ? authorPositionAdapter(authorPosition) : null,
  };
};

export const authorsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((author) => {
    return authorAdapter({ data: author });
  });
};
