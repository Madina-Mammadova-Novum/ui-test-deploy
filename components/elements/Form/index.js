import PropTypes from 'prop-types';

import { Button } from '@/elements';

const Form = ({ className, ctaProps, onSubmit, children, disabled }) => {
  const { text, variant, size, className: ctaClass } = ctaProps;

  return (
    <form className={className} autoComplete="off" onSubmit={onSubmit}>
      {children}
      <Button
        type="submit"
        customStyles={`${ctaClass} flex justify-center`}
        buttonProps={{ text, variant, size }}
        disabled={disabled}
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
  ctaProps: {
    text: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  }.isRequired,
};

export default Form;
