import ReactCountryFlag from 'react-country-flag';
import { components } from 'react-select';

import { OptionsListPropTypes } from '@/lib/types';

const { Option } = components;

const OptionsList = (props) => {
  const {
    label,
    data: { countryFlag, coverImage },
  } = props;
  return (
    <Option {...props}>
      <li className="flex flex-col overflow-x-clip bg-white text-inherit">
        <p className="flex cursor-pointer items-center rounded-md px-2.5 py-1.5 text-xsm font-medium capitalize text-inherit transition-all duration-75 ease-linear hover:bg-purple-light">
          {countryFlag && <ReactCountryFlag countryCode={countryFlag} svg className="mr-1.5 !h-4 !w-5" />}
          {coverImage && coverImage}
          {label}
        </p>
      </li>
    </Option>
  );
};

OptionsList.propTypes = OptionsListPropTypes;

export default OptionsList;
