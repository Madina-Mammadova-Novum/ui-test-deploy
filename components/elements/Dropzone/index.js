import { memo } from 'react';

import PropTypes from 'prop-types';

import { FileIcon } from '@/assets/Icons';
import { Input } from '@/elements';

const Dropzone = memo(({ areaParams, inputParams }) => {
  return (
    <div className="relative w-full" {...areaParams({ onClick: (e) => e.preventDefault() })}>
      <div className="relative items-center flex flex-col justify-center gap-2 w-full h-full">
        <Input
          type="file"
          name="file"
          required
          customStyles="absolute w-full h-full left-0 top-0 border-dashed z-10"
          {...inputParams()}
        />
        <FileIcon />
        <p className="text-center text-xsm text-gray font-normal">Drop your File here, or select</p>
        <span className="text-blue text-center font-medium text-xs">Click to browse</span>
      </div>
    </div>
  );
});

Dropzone.propTypes = {
  areaParams: PropTypes.func.isRequired,
  inputParams: PropTypes.func.isRequired,
};

export default Dropzone;
