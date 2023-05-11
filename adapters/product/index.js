export const postProductAdapter = ({ data }) => {
  const { product, density, quantity, tolerance } = data;
  return {
    productId: product?.value,
    referenceDensity: +density,
    quantity: +quantity,
    tolerance: +tolerance,
  };
};

export const postProductsAdapter = ({ data }) => {
  if (data === null) return [];
  return data
    .map((product) => {
      return postProductAdapter({ data: product });
    })
    .filter((item) => item);
};

export const getProductAdapter = ({ data }) => {
  const { id, name, density } = data;
  return {
    id,
    name,
    density,
  };
};

export const getProductsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((product) => {
    return getProductAdapter({ data: product });
  });
};
