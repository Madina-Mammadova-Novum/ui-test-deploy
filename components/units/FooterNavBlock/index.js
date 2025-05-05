import { FooterNavBlockPropTypes } from '@/lib/types';

import { NextLink, Title } from '@/elements';

const FooterNavBlock = ({ title, items }) => {
  return (
    <div className="w-[10.25rem] 3md:w-[11.625rem]">
      <Title level={5} className="title-main mb-6 text-gray">
        {title}
      </Title>
      <ul className="space-y-2 text-black">
        {Array.isArray(items) &&
          items.length > 0 &&
          items.map((item) => {
            return (
              <li key={item.path}>
                <NextLink href={item.path} className="text-xsm font-medium">
                  {item.title}
                </NextLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

FooterNavBlock.propTypes = FooterNavBlockPropTypes;

export default FooterNavBlock;
