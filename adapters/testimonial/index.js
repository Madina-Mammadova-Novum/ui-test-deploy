import { imageAdapter } from '@/adapters/image';

export const testimonialAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { quote, coverImage, treatmentPeriod } = attributes;

  return {
    id,
    quote,
    coverImage: imageAdapter(coverImage),
    treatmentPeriod,
  };
};

export const testimonialsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((testimonial) => {
    return testimonialAdapter({ data: testimonial });
  });
};
