export const imageFormatAdapter = ({ url, mime, width, height }) => {
  return { url, mime, width, height };
};
export const imageFormatsAdapter = (formats) => {
  if (formats === null) return null;
  Object.keys(formats).forEach((key) => {
    formats[key] = imageFormatAdapter(formats[key]);
  });
  return formats;
};
export const imageAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { name, alternativeText, formats, width, height, mime, url, createdAt, updatedAt } = attributes;

  return {
    id,
    name,
    alternativeText,
    format: {
      ...imageFormatsAdapter(formats),
      original: imageFormatAdapter({
        width,
        height,
        mime,
        url,
      }),
    },
    createdAt,
    updatedAt,
  };
};

export const imagesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((image) => {
    return imageAdapter({
      data: image,
    });
  });
};
