import { LoaderPropTypes } from '@/lib/types';

const Loader = ({ className = 'w-8 h-8' }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`${className} animate-spin rounded-full border-4 border-t-blue`} />
    </div>
  );
};

Loader.propTypes = LoaderPropTypes;

export default Loader;
