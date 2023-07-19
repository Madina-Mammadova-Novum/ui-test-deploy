import { ROOT_SLUG } from '@/lib/constants';

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

export const accountNavigationAdapter = ({ data }) => {
  if (!data) return {};

  const { page, perPage, sortBy } = data;

  const setSkipedValue = (pageValue, perPageValue) => {
    if (pageValue === 1) return 0;
    return (pageValue - 1) * perPageValue;
  };

  return {
    skip: setSkipedValue(page, perPage),
    pageSize: perPage,
    sortColumn: sortBy,
    sortColumnDirection: sortBy,
  };
};
