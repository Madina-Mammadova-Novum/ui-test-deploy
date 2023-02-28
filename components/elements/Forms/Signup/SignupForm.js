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
      <Step number="1" title="Step 1: Choose who you are" />
      <hr className="divide" />
      <Step number="2" title="Step 2: Personal details" />
      <hr className="divide" />
      <Step number="3" title="Step 3: Company Details" />
      <hr className="divide" />
      <Step number="4" title="Step 4: How many tankers do you have?" />
      <hr className="divide" />
      <Step number="5" title="Step 5: Company Addresss" />

      <Step number="5" title="Step without step" />

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
