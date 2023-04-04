import PropTypes from 'prop-types';

import StepBody from './StepBody';
import StepHeader from './StepHeader';

const Step = ({ title, children, containerClass, titleClass, bodyClass }) => {
  return (
    <div className={containerClass}>
      <StepHeader title={title} className={titleClass} />
      <StepBody className={bodyClass}>{children}</StepBody>
    </div>
  );
};

Step.defaultProps = {
  containerClass: '',
  titleClass: '',
  bodyClass: '',
};

Step.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  titleClass: PropTypes.string,
  bodyClass: PropTypes.string,
};

export default Step;
