export const productAdapter = ({ data }) => {
  const { product, density, quantity, tolerance } = data;
  return {
    productId: product?.value,
    referenceDensity: density,
    quantity,
    tolerance,
  };
};

export const productsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((product) => {
    return productAdapter({ data: product });
  });
};
