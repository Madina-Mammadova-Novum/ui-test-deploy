import { memo } from 'react';

import PropTypes from 'prop-types';

import CloseSVG from '@/assets/images/close.svg';

const File = memo(({ title, onClick }) => {
  return (
    <div className="flex max-w-xs h-min px-5 py-2 rounded-md border border-blue border-solid justify-between items-center">
      <p className="text-black text-xsm font-semibold normal-case">{title}</p>
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
