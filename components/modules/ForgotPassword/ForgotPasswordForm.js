import { useFormContext } from 'react-hook-form';

import { Button, Input } from '@/elements';

const ForgotPasswordForm = () => {
  const { handleSubmit, reset, register } = useFormContext();

  const onSubmit = (data) => {
    reset();
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        register={register}
        label="email"
        placeholder="Enter your email"
        customStyles="mt-4"
        type="email"
      />
      <Button
        type="submit"
        buttonProps={{
          text: 'Get a new password',
          variant: 'primary',
          size: 'large',
        }}
        customStyles="mt-5 w-full"
      />
    </form>
  );
};

export default ForgotPasswordForm;
