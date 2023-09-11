import { CloseIconPropTypes } from '@/lib/types';

const CloseIcon = ({ className, onClick }) => {
  return (
    <div
      aria-hidden
      onClick={onClick}
      className={`absolute border border-gray-darker shadow-2xmd border-solid ${className} rounded-full bg-white text-xxs font-bold flex items-center justify-center`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8047 4.19526C12.0651 4.45561 12.0651 4.87772 11.8047 5.13807L5.13807 11.8047C4.87772 12.0651 4.45561 12.0651 4.19526 11.8047C3.93491 11.5444 3.93491 11.1223 4.19526 10.8619L10.8619 4.19526C11.1223 3.93491 11.5444 3.93491 11.8047 4.19526Z"
          fill="#072D46"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.19526 4.19526C4.45561 3.93491 4.87772 3.93491 5.13807 4.19526L11.8047 10.8619C12.0651 11.1223 12.0651 11.5444 11.8047 11.8047C11.5444 12.0651 11.1223 12.0651 10.8619 11.8047L4.19526 5.13807C3.93491 4.87772 3.93491 4.45561 4.19526 4.19526Z"
          fill="#072D46"
        />
      </svg>
    </div>
  );
};

CloseIcon.propTypes = CloseIconPropTypes;

export default CloseIcon;
