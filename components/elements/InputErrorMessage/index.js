import { InputErrorMessagePropTypes } from '@/lib/types';

const InputErrorMessage = ({ message = '', className = 'text-xs-sm text-red' }) => (
  <p className={className}>{message}</p>
);

InputErrorMessage.propTypes = InputErrorMessagePropTypes;

export default InputErrorMessage;
