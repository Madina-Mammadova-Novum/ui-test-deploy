import { StepHeaderPropTypes } from '@/lib/types';

const StepHeader = ({ title, className = '' }) => {
  return <span className={`${className} text-blue text-xs-sm font-semibold uppercase`}>{title}</span>;
};

StepHeader.propTypes = StepHeaderPropTypes;

export default StepHeader;
