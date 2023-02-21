import React from 'react';

import PropTypes from 'prop-types';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default BaseLayout;
