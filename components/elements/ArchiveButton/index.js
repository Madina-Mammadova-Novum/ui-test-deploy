'use client';

import { ArchiveButtonPropTypes } from '@/lib/types';

import ArchiveSVG from '@/assets/images/archive.svg';

const ArchiveButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-md border border-gray-light bg-transparent p-1 outline-none hover:bg-gray-darker"
    >
      <ArchiveSVG className="fill-black" />
    </button>
  );
};

ArchiveButton.propTypes = ArchiveButtonPropTypes;

export default ArchiveButton;
