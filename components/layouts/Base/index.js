import { BaseLayoutPropTypes } from '@/lib/types';

import Providers from '@/providers';

import '@/styles/index.css';

const BaseLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

BaseLayout.propTypes = BaseLayoutPropTypes;

export default BaseLayout;
