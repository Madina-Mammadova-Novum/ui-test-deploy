import { BaseLayoutPropTypes } from '@/lib/types';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.css';

export default function BaseLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

BaseLayout.propTypes = BaseLayoutPropTypes;
