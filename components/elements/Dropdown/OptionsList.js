import { components } from 'react-select';

import PropTypes from 'prop-types';

const OptionsList = (props) => {
  const { value } = props;

  return (
    <components.Option {...props}>
      <li className="bg-white overflow-x-clip flex flex-col">
        <p className="text-black px-1.5 py-2.5 uppercase rounded-md cursor-pointer text-xsm font-medium hover:bg-purple-light transition-all duration-75 ease-linear">
          {value}
        </p>
      </li>
    </components.Option>
  );
};

OptionsList.propTypes = {
  value: PropTypes.string.isRequired,
};

export default OptionsList;
