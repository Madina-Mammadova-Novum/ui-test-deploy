import ReactCountryFlag from 'react-country-flag';

import { OptionRowPropTypes } from '@/lib/types';

const OptionRow = ({ value, countryFlag = null, coverImage = null, isDisabled = false }) => {
  return (
    <div className="box-border">
      <div
        className={`box-border flex items-center whitespace-nowrap rounded-md text-xsm font-medium ${
          isDisabled ? 'text-gray-400 opacity-50' : ''
        }`}
      >
        {countryFlag && (
          <ReactCountryFlag
            countryCode={countryFlag}
            svg
            className={`mr-1.5 !h-4 !w-5 ${isDisabled ? 'opacity-50' : ''}`}
          />
        )}
        {coverImage && coverImage}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
          {isDisabled && <span className="ml-2 text-gray-400">(Disabled)</span>}
        </span>
      </div>
    </div>
  );
};

OptionRow.propTypes = OptionRowPropTypes;

export default OptionRow;
