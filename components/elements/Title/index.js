import React from 'react';

import PropTypes from 'prop-types';

const Title = ({ level, children, className, ...rest }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Title.defaultProps = {
  className: '',
};

export default Title;
