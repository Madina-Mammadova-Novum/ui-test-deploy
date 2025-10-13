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
