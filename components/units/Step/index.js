import StepBody from './StepBody';
import StepHeader from './StepHeader';

import { StepPropTypes } from '@/lib/types';

const Step = ({ title, children, containerClass = '', titleClass = '', bodyClass = '' }) => {
  return (
    <div className={containerClass}>
      <StepHeader title={title} className={titleClass} />
      <StepBody className={bodyClass}>{children}</StepBody>
    </div>
  );
};

Step.propTypes = StepPropTypes;

export default Step;
