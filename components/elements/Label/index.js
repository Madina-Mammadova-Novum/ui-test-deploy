import { LabelPropTypes } from '@/lib/types';

const Label = ({ children, className, name = '' }) => {
  return (
    <label htmlFor={name} className={`${className} uppercase text-gray font-semibold`}>
      {children}
    </label>
  );
};

Label.propTypes = LabelPropTypes;

export default Label;
