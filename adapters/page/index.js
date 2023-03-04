import { blocksDataAdapter } from '@/adapters/block';

export const pageAdapter = ({ data }) => {
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
    blocks: blocks !== undefined ? blocksDataAdapter(blocks) : [],
    seo: seo !== undefined ? seo : null,
  };
};
