import { ROOT_SLUG } from '@/lib/constants';
import { setSkippedValue } from '@/utils/helpers';

export const navigationItemAdapter = ({ data }) => {
  if (data === null) return null;

  const { order, id, title, type, path, externalPath, collapsed, related, items } = data;
  return {
    order,
    id,
    title,
    type,
    path: path === `/${ROOT_SLUG}` ? '/' : path,
    externalPath,
    collapsed,
    related: related
      ? {
          id: related.id,
          contentType: related.__contentType,
        }
      : null,
    items: items.length > 0 ? navigationAdapter({ data: items }) : [],
  };
};

export const navigationAdapter = ({ data }) => {
  if (data === null) return [];

  return data.map((item) => {
    return navigationItemAdapter({ data: item });
  });
};

export const navigationPagesAdapter = (item) => ({
  label: item,
  value: item,
});

export const basePageNavAdapter = ({ data }) => {
  if (!data) return {};

  const { page, perPage } = data;

  return {
    skip: setSkippedValue(page, perPage),
    pageSize: perPage,
  };
};

export const positionsPageNavAdapter = ({ data }) => {
  if (!data) return {};

  const { sortBy } = data;

  return {
    ...basePageNavAdapter({ data }),
    sortColumn: 'Name',
    sortColumnDirection: sortBy,
  };
};

export const negotiationPageNavAdapter = ({ data }) => {
  if (!data) return {};

  const { stage } = data;

  return {
    ...basePageNavAdapter({ data }),
    stage,
  };
};
