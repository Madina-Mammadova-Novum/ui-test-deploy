import { components } from 'react-select';

import { OptionsListPropTypes } from '@/lib/types';

const { Option } = components;

const OptionsList = (props) => {
  const { label } = props;

  return (
    <Option {...props}>
      <li className="bg-white overflow-x-clip flex flex-col">
        <p className="text-black px-1.5 py-2.5 capitalize rounded-md cursor-pointer text-xsm font-medium hover:bg-purple-light transition-all duration-75 ease-linear">
          {label}
        </p>
      </li>
    </Option>
  );
};

OptionsList.propTypes = OptionsListPropTypes;

export default OptionsList;
