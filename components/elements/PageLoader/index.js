import Loader from '../Loader';

import { PageLoaderPropTypes } from '@/lib/types';

export const PageLoader = ({ text, className = 'h-screen' }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center overflow-clip`}>
      <span className="flex items-center justify-center gap-x-5 text-lg font-semibold">
        {text} <Loader className="h-6 w-6" />
      </span>
    </div>
  );
};

PageLoader.propTypes = PageLoaderPropTypes;
