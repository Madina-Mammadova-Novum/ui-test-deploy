import { InputErrorMessagePropTypes } from '@/lib/types';

const InputErrorMessage = ({ message }) => <p className="text-xs-sm text-red">{message}</p>;

InputErrorMessage.propTypes = InputErrorMessagePropTypes;

export default InputErrorMessage;
