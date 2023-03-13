import PropTypes from 'prop-types';

import { Button } from '@/elements';

const Form = ({ className, submitButton, onSubmit, children, disabled }) => {
  const { text, variant, size, className: buttonClassName } = submitButton;

  return (
    <form className={className} autoComplete="off" onSubmit={onSubmit}>
      {children}
      <Button
        type="submit"
        buttonProps={{
          text: disabled ? 'Please wait...' : text,
          variant: disabled ? 'secondary' : variant,
          size,
        }}
        disabled={disabled}
        customStyles={`${buttonClassName} mt-4 w-full`}
      />
    </form>
  );
};
Form.defaultProps = {
  className: '',
  disabled: false,
  onSubmit: () => ({}),
};

Form.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitButton: {
    text: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  }.isRequired,
};

export default Form;
