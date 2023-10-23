import Loader from '../Loader';

import { PageLoaderPropTypes } from '@/lib/types';

export const PageLoader = ({ text }) => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-clip">
      <span className="font-semibold text-lg flex items-center justify-center gap-x-5">
        {text} <Loader className="h-6 w-6" />
      </span>
    </div>
  );
};

PageLoader.propTypes = PageLoaderPropTypes;
