import { FooterNavBlockPropTypes } from '@/lib/types';

import { NextLink, Title } from '@/elements';

const FooterNavBlock = ({ title, items }) => {
  return (
    <div className="w-32 3md:w-40">
      <Title level={5} className="title-main mb-4 text-gray">
        {title}
      </Title>
      <ul className="space-y-2 text-black">
        {items.map((item) => {
          return (
            <li key={item.path}>
              <NextLink href={item.path} className="text-xsm">
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
