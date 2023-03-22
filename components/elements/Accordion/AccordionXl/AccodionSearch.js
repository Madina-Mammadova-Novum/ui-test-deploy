import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { SearchIcon } from '@/assets/Icons';
import { Input } from '@/elements';

const AccordionSearchXL = ({ value, focused, onChange }) => {
  const ref = useRef(null);

  const handleActive = () => onChange('focused', true);
  const hadleChange = (v) => onChange('searchVal', v);

  useEffect(() => {
    if (focused) {
      ref.current.focus();
      onChange('focused', true);
    }
    return () => {
      onChange('searchValue', '');
      onChange('focused', false);
    };
  }, [focused, onChange]);

  return (
    <div className="flex relative hover:fill-white" aria-hidden="true" onClick={handleActive}>
      <SearchIcon className="absolute left-5 top-3" isActive={focused} />
      <Input
        ref={ref}
        type="search"
        placeholder="search"
        value={value}
        onChange={hadleChange}
        customStyles="pr-2 w-full transition-all py-3 font-semibold placeholder:capitalize rounded-xl outline-none placeholder:text-white placeholder:text-sm text-sm border-none bg-transparent hover:bg-blue-dark focus:bg-blue"
      />
    </div>
  );
};

AccordionSearchXL.defaultProps = {
  value: '',
  focused: false,
  onChange: () => {},
};

AccordionSearchXL.propTypes = {
  value: PropTypes.string,
  focused: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AccordionSearchXL;
