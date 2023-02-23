import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { SignupForm } from '@/elements';

const Signup = ({ title }) => {
  return (
    <FormManager>
      <h1 className="text-lg text-black font-bold">{title}</h1>
      <SignupForm />
    </FormManager>
  );
};

Signup.defaultProps = {
  title: '',
};

Signup.propTypes = {
  title: PropTypes.string,
};

export default Signup;
