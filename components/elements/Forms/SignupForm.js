import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import Step from './Signup/Step';

import { Button } from '@/elements';
import { options } from '@/utils/formOptions';

const SignupForm = () => {
  const { handleSubmit } = useFormContext(options.signupSchema);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit(onSubmit)}>
      <Step number="1" title="Choose who you are" />
      <hr className="divide" />
      <Step number="2" title="Personal details" />
      <hr className="divide" />
      <Step number="3" title="Company Details" />
      <hr className="divide" />
      <Step number="4" title="How many tankers do you have?" />
      <hr className="divide" />
      <Step number="5" title="Company Addresss" />
      <hr className="divide" />
      <Button
        buttonProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
        customStyles="flex justify-center"
        type="submit"
      />
    </form>
  );
};

SignupForm.propTypes = {
  options: PropTypes.shape({
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default SignupForm;
