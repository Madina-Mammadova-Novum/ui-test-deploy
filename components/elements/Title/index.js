import React from 'react';

import { TitlePropTypes } from '@/lib/types';

const Title = ({ level = '1', children, className = '', ...rest }) => {
  const Tag = `h${level}`;
  const childElements = React.Children.toArray(children);

  return (
    <Tag className={`${className}`} {...rest}>
      {childElements}
    </Tag>
  );
};

Title.propTypes = TitlePropTypes;

export default Title;
