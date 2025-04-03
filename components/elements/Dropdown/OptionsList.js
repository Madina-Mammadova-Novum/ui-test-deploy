import ReactCountryFlag from 'react-country-flag';
import { components } from 'react-select';

import { OptionsListPropTypes } from '@/lib/types';

const { Option } = components;

const OptionsList = (props) => {
  const {
    label,
    data: { countryFlag, coverImage, isDisabled },
  } = props;
  return (
    <Option {...props}>
      <li className={`flex flex-col overflow-x-clip bg-white text-inherit ${isDisabled ? 'cursor-not-allowed' : ''}`}>
        <p
          className={`flex items-center rounded-md px-2.5 py-1.5 text-xsm font-medium capitalize transition-all duration-75 ease-linear ${
            isDisabled
              ? 'pointer-events-none text-gray-400 opacity-50'
              : 'cursor-pointer text-inherit hover:bg-purple-light'
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
          <span>
            {label}
            {isDisabled && <span className="ml-2 text-gray-400">(Disabled)</span>}
          </span>
        </p>
      </li>
    </Option>
  );
};

OptionsList.propTypes = OptionsListPropTypes;

export default OptionsList;
