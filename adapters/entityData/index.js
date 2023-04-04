import { blocksDataAdapter } from '@/adapters/block';

export const entityDataAdapter = async ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, slug, content, blocks, seo } = attributes;
  if (title === undefined) return null;
  return {
    ...attributes,
    id,
    title,
    slug,
    content,
    blocks: blocks !== undefined ? await blocksDataAdapter(blocks) : [],
    seo: seo !== undefined ? seo : null,
  };
};

export const entitiesDataAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((entity) => {
    return entityDataAdapter({ data: entity });
  });
};
