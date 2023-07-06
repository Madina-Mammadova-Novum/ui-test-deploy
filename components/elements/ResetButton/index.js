import { ResetButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const ResetButton = ({ text, variant, size, onClick, ...rest }) => {
  return <Button type="button" buttonProps={{ text, variant, size }} {...rest} onClick={onClick} />;
};

ResetButton.propTypes = ResetButtonPropTypes;

export default ResetButton;
