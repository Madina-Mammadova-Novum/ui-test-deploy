import React from 'react';

import PropTypes from "prop-types";

import { NextLink, Title } from '@/elements';


const FooterNavBlock = ({ title, items }) => {
  return (
    <div className="w-40" key={title}>
      <Title level={5} className="title-main text-gray mb-4">
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
          )
        })}
      </ul>
    </div>
  );
};

FooterNavBlock.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
    path: PropTypes.string,
}),
};

export default FooterNavBlock;
