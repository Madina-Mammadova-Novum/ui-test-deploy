import { BaseLayoutPropTypes } from '@/lib/types';
import '@/styles/index.css';

export default async function BaseLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

BaseLayout.propTypes = BaseLayoutPropTypes;
