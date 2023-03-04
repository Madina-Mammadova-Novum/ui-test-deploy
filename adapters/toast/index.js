export const toastAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, code } = attributes;

  return {
    id,
    title,
    code,
  };
};
