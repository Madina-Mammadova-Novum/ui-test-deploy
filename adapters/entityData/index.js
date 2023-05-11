import { blocksDataAdapter } from '@/adapters/block';
import { ROOT_COLLECTION_TYPE } from '@/lib/constants';

export const entityDataError = (error) => {
  return {
    error: {
      ...error,
      message: error?.message || 'Unknown error',
    },
  };
};

export const entityDataAdapter = async ({ data }) => {
  if (!data) return null;
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

export const entitiesDataAdapter = async ({ data }) => {
  if (data === null) return [];
  const entitiesData = await Promise.all(
    data.map((entity) => {
      return entityDataAdapter({ data: entity });
    })
  );
  return entitiesData;
};

export const entityDataResponseAdapter = async (response, locale, collectionType) => {
  const { data, error } = response;
  if (error) return entityDataError(error);

  if (Array.isArray(data) && data.length === 0) return null;

  const responseData = Array.isArray(data) && data.length > 0 ? data[0] : data;
  const entityData = responseData ? await entityDataAdapter({ data: responseData }) : null;
  return {
    data: {
      ...entityData,
      locale: locale || 'en',
      collectionType: collectionType || ROOT_COLLECTION_TYPE,
    },
  };
};

export const entitiesDataResponseAdapter = async (response) => {
  const { data, error } = response;
  if (error) return entityDataError(error);
  // todo: need to create correct data adaptation
  return data;
};
