import { SubmitButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const SubmitButton = ({ text, variant, size, isSubmitting, icon, ...rest }) => {
  return (
    <Button
      type="submit"
      buttonProps={{
        text: isSubmitting ? 'Please wait...' : text,
        variant: isSubmitting ? 'secondary' : variant,
        size,
        icon,
      }}
      {...rest}
    />
  );
};

SubmitButton.propTypes = SubmitButtonPropTypes;

export default SubmitButton;
