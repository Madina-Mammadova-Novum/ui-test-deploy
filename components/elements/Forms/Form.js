import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Button } from '@/elements';

const Form = ({ className, ctaProps, children, disabled }) => {
  const { text, variant, size } = ctaProps;

  const { handleSubmit, reset, formState } = useFormContext();
  const { isDirty, isValid } = formState;

  const onSubmit = (data) => {
    reset();
    return data;
  };

  return (
    <form className={className} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {children}
      <Button
        type="submit"
        customStyles="flex justify-center"
        buttonProps={{ text, variant, size }}
        disabled={disabled ? disabled || !isDirty || !isValid : !isDirty || !isValid}
      />
    </form>
  );
};

Form.defaultProps = {
  className: '',
  disabled: false,
};

Form.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ctaProps: {
    text: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  }.isRequired,
};

export default Form;
