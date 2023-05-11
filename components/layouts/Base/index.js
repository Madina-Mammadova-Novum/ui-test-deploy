import { BaseLayoutPropTypes } from '@/lib/types';

import { ClientSidePackages, TailwindIndicator } from '@/common';

import '@/styles/index.css';

const BaseLayout = ({ children, className = '' }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={className}>
        {children}
        <ClientSidePackages />
        <TailwindIndicator />
      </body>
    </html>
  );
};

BaseLayout.propTypes = BaseLayoutPropTypes;

export default BaseLayout;
