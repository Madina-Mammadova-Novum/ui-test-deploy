import ReactCountryFlag from 'react-country-flag';

import { OptionRowPropTypes } from '@/lib/types';

const OptionRow = ({ value, countryFlag = null, coverImage = null }) => {
  return (
    <div className="box-border">
      <div className="box-border flex items-center whitespace-nowrap rounded-md text-xsm font-medium">
        {countryFlag && <ReactCountryFlag countryCode={countryFlag} svg className="mr-1.5 !h-4 !w-5" />}
        {coverImage && coverImage}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{value}</span>
      </div>
    </div>
  );
};

OptionRow.propTypes = OptionRowPropTypes;

export default OptionRow;
