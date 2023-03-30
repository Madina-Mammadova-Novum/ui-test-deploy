import PropTypes from 'prop-types';

import { SearchIcon } from '@/assets/icons';
import { Button } from '@/elements';

const AccordionSearchSm = ({ focused, onChange }) => {
  return (
    <Button
      buttonProps={{ icon: <SearchIcon isActive={focused} />, variant: 'tertiary', size: 'small' }}
      customStyles={`${
        focused ? 'bg-blue' : 'hover:bg-blue-dark fill-w'
      } flex flex-col text-sm font-semibold capitalize py-2 rounded-md px-2`}
      onClick={() => {
        onChange('resized', true);
      }}
    />
  );
};

AccordionSearchSm.defaultProps = {
  focused: false,
  onChange: () => {},
};

AccordionSearchSm.propTypes = {
  focused: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AccordionSearchSm;
