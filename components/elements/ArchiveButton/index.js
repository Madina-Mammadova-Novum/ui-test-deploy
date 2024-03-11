'use client';

import { ArchiveButtonPropTypes } from '@/lib/types';

import ArchiveSVG from '@/assets/images/archive.svg';

const ArchiveButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 relative rounded-md border border-gray-light hover:bg-gray-darker outline-none bg-transparent"
    >
      <ArchiveSVG className="fill-black" />
    </button>
  );
};

ArchiveButton.propTypes = ArchiveButtonPropTypes;

export default ArchiveButton;
