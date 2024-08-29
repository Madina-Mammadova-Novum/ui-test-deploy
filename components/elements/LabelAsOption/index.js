import { LabelAsOptionPropTypes } from '@/lib/types';

const LabelAsOption = ({ icon, text }) => (
  <div className="flex w-full justify-between">
    <div className="flex items-center">
      <div className="pr-1.5">{icon}</div>
      <span>{text}</span>
    </div>
  </div>
);

LabelAsOption.propTypes = LabelAsOptionPropTypes;

export default LabelAsOption;
