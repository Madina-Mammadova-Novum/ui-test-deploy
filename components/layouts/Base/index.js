import React from 'react';

import PropTypes from 'prop-types';

import '@/styles/index.css';
import { ClientSidePackages } from '@/common';

const BaseLayout = ({ children, className }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${className}`}
        // className={`${className} max-w-screen-2lg min-h-screen flex flex-col`}
      >
        {children}
        <ClientSidePackages />
      </body>
    </html>
  );
};

BaseLayout.defaultProps = {
  className: '',
};

BaseLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default BaseLayout;
