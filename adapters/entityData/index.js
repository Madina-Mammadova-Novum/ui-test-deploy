import { blocksDataAdapter } from '@/adapters/block';

export const entityDataAdapter = async ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, slug, content, sections, seo } = attributes;
  if (title === undefined) return null;
  return {
    ...attributes,
    id,
    title,
    slug,
    content,
    blocks: sections !== undefined ? await blocksDataAdapter(sections) : [],
    seo: seo !== undefined ? seo : null,
  };
};

export const entitiesDataAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((entity) => {
    return entityDataAdapter({ data: entity });
  });
};
