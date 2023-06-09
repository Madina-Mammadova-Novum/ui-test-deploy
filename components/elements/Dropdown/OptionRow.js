import ReactCountryFlag from 'react-country-flag';

import { OptionRowPropTypes } from '@/lib/types';

const OptionRow = ({ value, countryFlag = null, coverImage = null }) => {
  return (
    <div className="box-border">
      <div className="flex rounded-md text-xsm font-medium items-center box-border whitespace-nowrap">
        {countryFlag && <ReactCountryFlag countryCode={countryFlag} svg className="!w-5 !h-4 mr-1.5" />}
        {coverImage && coverImage}
        <span>{value}</span>
      </div>
    </div>
  );
};

OptionRow.propTypes = OptionRowPropTypes;

export default OptionRow;
