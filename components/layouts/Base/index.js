import { BaseLayoutPropTypes } from '@/lib/types';

import Providers from '@/providers';

import '@/styles/index.css';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

BaseLayout.propTypes = BaseLayoutPropTypes;

export default BaseLayout;
