import { memo } from 'react';

import PropTypes from 'prop-types';

import CloseSVG from '@/assets/images/close.svg';

const File = memo(({ title, onClick }) => {
  return (
    <div className="flex h-min max-w-xs items-center justify-between rounded-md border border-solid border-blue px-5 py-2">
      <p className="text-xsm font-semibold normal-case text-black">{title}</p>
      <button type="button" className="h-min" onClick={onClick}>
        <CloseSVG className="fill-black pl-1" />
      </button>
    </div>
  );
});

File.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default File;
