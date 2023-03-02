import React from 'react';

import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.css';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="max-w-screen-2lg">
        <div id="portal">{children}</div>
      </body>
    </html>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default BaseLayout;
