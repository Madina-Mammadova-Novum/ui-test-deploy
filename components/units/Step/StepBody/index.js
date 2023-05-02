import { StepBodyPropTypes } from '@/lib/types';

const StepBody = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

StepBody.propTypes = StepBodyPropTypes;

export default StepBody;
