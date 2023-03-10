import PropTypes from 'prop-types';

import { NextImage } from '@/elements';

const OptionRow = ({ countryFlag, value }) => {
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

OptionRow.defaultProps = {
  countryFlag: null,
};

OptionRow.propTypes = {
  countryFlag: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  value: PropTypes.string.isRequired,
};

export default OptionRow;
