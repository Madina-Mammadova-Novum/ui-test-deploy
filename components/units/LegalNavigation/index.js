import { LegalNavigationPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';

const LegalNavigation = ({ data = [] }) => {
  const printLink = ({ path, title }) => (
    <NextLink key={path} href={path} target="_blank" className="underline">
      {title}
    </NextLink>
  );

  if (!data?.length) return null;

  return <div className="flex gap-x-5 text-black"> {data?.map(printLink)}</div>;
};

LegalNavigation.propTypes = LegalNavigationPropTypes;

export default LegalNavigation;
