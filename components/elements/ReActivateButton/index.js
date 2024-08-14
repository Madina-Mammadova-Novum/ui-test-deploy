'use client';

import { ArchiveButtonPropTypes } from '@/lib/types';

import HistorySVG from '@/assets/images/history.svg';

const ReActivateButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-md border border-gray-light bg-transparent p-1 outline-none hover:bg-gray-darker"
    >
      <HistorySVG className="fill-black" />
    </button>
  );
};

ReActivateButton.propTypes = ArchiveButtonPropTypes;

export default ReActivateButton;
