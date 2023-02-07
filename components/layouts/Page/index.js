import React from 'react';

import PropTypes from 'prop-types';

const PageLayout = ({ children }) => {
  return <div className="w-full px-4 sm:px-[38px] lg:px-20 2lg:px-[100px] 2lg:container mx-auto">{children}</div>;
};

PageLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
export default PageLayout;
