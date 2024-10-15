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

export const legalPropAdapter = ({ params }) => {
  if (!params) return null;

  const { slug } = params;

  let legal = false;

  if (slug?.length >= 2 && slug[0] === 'legal') {
    slug.splice(0, 1); // remove 'legal' from the array
    legal = true;
  }

  return { legal };
};
