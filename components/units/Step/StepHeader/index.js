import { StepHeaderPropTypes } from '@/lib/types';

const StepHeader = ({ title, className = '' }) => {
  return <span className={`${className} text-xs-sm font-semibold uppercase text-blue`}>{title}</span>;
};

StepHeader.propTypes = StepHeaderPropTypes;

export default StepHeader;
