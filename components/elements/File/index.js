import { memo } from 'react';

import PropTypes from 'prop-types';

import { CloseIcon } from '@/assets/Icons';

const File = memo(({ title, onClick }) => {
  return (
    <div className="flex w-max h-max gap-4 px-5 py-2 rounded-md border border-blue border-solid justify-between items-center">
      <p className="text-black text-xsm font-semibold normal-case">{title}</p>
      <button type="button" className="h-min" onClick={onClick}>
        <CloseIcon />
      </button>
    </div>
  );
});

File.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default File;
