import { useFormContext } from 'react-hook-form';

import { Button } from '@/elements';
import { PasswordValidation } from '@/ui';

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { submitCount },
  } = useFormContext();

  const onSubmit = (data) => {
    reset();
    return data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordValidation submitCount={submitCount} />
      <Button
        type="submit"
        buttonProps={{
          text: 'Reset password',
          variant: 'primary',
          size: 'large',
        }}
        customStyles="mt-5 w-[296px]"
      />
    </form>
  );
};

export default ResetPasswordForm;
