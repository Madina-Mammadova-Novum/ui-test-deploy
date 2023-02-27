import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import Step from './Step';

import { Button } from '@/elements';

const SignupForm = () => {
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = useFormContext();

  const onSubmit = (data) => {
    reset();
    return data;
  };

  const isRules = watch('params.rule');

  return (
    <form className="flex flex-col gap-5 pt-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Step number="1" title="Choose who you are" />
      <hr className="divide" />
      <Step number="2" title="Personal details" />
      <hr className="divide" />
      <Step number="3" title="Company Details" />
      <hr className="divide" />
      <Step number="4" title="How many tankers do you have?" />
      <hr className="divide" />
      <Step number="5" title="Company Addresss" />

      <Button
        buttonProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
        customStyles="flex justify-center"
        type="submit"
        disabled={!isRules || !isDirty || !isValid}
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
