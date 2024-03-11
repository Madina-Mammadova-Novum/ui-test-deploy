import { LoaderPropTypes } from '@/lib/types';

const Loader = ({ className = 'w-8 h-8' }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`${className} border-4 rounded-full border-t-blue animate-spin`} />
    </div>
  );
};

Loader.propTypes = LoaderPropTypes;

export default Loader;
