import { LabelPropTypes } from '@/lib/types';

const Label = ({ children, className, name = '' }) => {
  return (
    <label htmlFor={name} className={`${className} font-semibold uppercase text-gray`}>
      {children}
    </label>
  );
};

Label.propTypes = LabelPropTypes;

export default Label;
