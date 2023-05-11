import ReactCountryFlag from 'react-country-flag';
import { components } from 'react-select';

import { OptionsListPropTypes } from '@/lib/types';

const { Option } = components;

const OptionsList = (props) => {
  const { label, data } = props;
  const { countryFlag } = data;
  return (
    <Option {...props}>
      <li className="bg-white overflow-x-clip flex flex-col">
        <p className="text-black px-1.5 py-2.5 capitalize flex items-center rounded-md cursor-pointer text-xsm font-medium hover:bg-purple-light transition-all duration-75 ease-linear">
          {countryFlag && <ReactCountryFlag countryCode={countryFlag} svg className="!w-5 !h-4 mr-1.5" />}
          {label}
        </p>
      </li>
    </Option>
  );
};

OptionsList.propTypes = OptionsListPropTypes;

export default OptionsList;
