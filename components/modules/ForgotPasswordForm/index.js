'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { captchaSchema, forgotPasswordSchema } from '@/lib/schemas';
import { forgotPassword } from '@/services/user';
import { Captcha } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ForgotPasswordForm = () => {
  const [captcha, setCaptcha] = useState('');

  const schema = yup.object().shape({
    ...forgotPasswordSchema(),
    ...captchaSchema(),
  });

  const methods = useHookFormParams({ schema, mode: 'onSubmit' });

  const {
    reset,
    register,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    setValue('captcha', captcha);
    trigger('captcha');
  }, [captcha, setValue, trigger]);

  const onSubmit = async (formData) => {
    const { error, message } = await forgotPassword({ data: formData });

    if (!error) {
      successToast(message);
    } else {
      errorToast(error.title, error.message);
    }

    reset();
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="pt-4"
        submitButton={{
          text: 'Get a new password',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <Input
          {...register('email')}
          label="Email"
          placeholder="Enter your email"
          customStyles="mt-4"
          type="email"
          disabled={isSubmitting}
          error={errors.email?.message}
        />
        <Captcha onChange={setCaptcha} />
      </FormManager>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
