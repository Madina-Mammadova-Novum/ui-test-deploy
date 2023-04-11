export const navigationItemAdapter = ({ data }) => {
  if (data === null) return null;
  const { order, id, title, type, path, externalPath, collapsed, related, items } = data;
  return {
    order,
    id,
    title,
    type,
    path: path === '/home' ? '/' : path,
    externalPath,
    collapsed,
    related: {
      id: related.id,
      contentType: related.__contentType,
    },
    items: items.length > 0 ? navigationAdapter({ data: items }) : [],
  };
};

export const navigationAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((author) => {
    return navigationItemAdapter({ data: author });
  });
};
