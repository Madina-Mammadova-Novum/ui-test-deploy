'use client';

import { ArchiveButtonPropTypes } from '@/lib/types';

import HistorySVG from '@/assets/images/history.svg';

const ReActivateButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 relative rounded-md border border-gray-light hover:bg-gray-darker outline-none bg-transparent"
    >
      <HistorySVG className="fill-black" />
    </button>
  );
};

ReActivateButton.propTypes = ArchiveButtonPropTypes;

export default ReActivateButton;
