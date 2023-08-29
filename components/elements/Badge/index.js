import { BadgePropTypes } from '@/lib/types';

const Badge = ({ counter, className = 'h-5 w-5 -top-0.5 right-0 p-1' }) => {
  return (
    counter !== 0 && (
      <div
        className={`absolute border border-white border-solid ${className} rounded-full bg-blue text-xxs font-bold text-white flex items-center justify-center`}
      >
        {counter}
      </div>
    )
  );
};

Badge.propTypes = BadgePropTypes;

export default Badge;
