export const updateCategoryList = async (block) => {
  const { categories } = block;
  const { data } = categories;
  block.categories = data.map((category) => {
    return category;
  });
  return block;
};
