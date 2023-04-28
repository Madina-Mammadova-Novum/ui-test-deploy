import { OptionRowPropTypes } from '@/lib/types';

import { NextImage } from '@/elements';

const OptionRow = ({ value, countryFlag = null }) => {
  return (
    <div className="box-border">
      <div className="flex hover:bg-purple-light rounded-md text-xsm font-medium items-center box-border whitespace-nowrap">
        {countryFlag && (
          <NextImage width={20} height={15} src={countryFlag} customStyles="max-h-[15px]" alt={`${countryFlag} flag`} />
        )}
        <span className={countryFlag && 'ml-1.5'}>{value}</span>
      </div>
    </div>
  );
};

OptionRow.propTypes = OptionRowPropTypes;

export default OptionRow;
