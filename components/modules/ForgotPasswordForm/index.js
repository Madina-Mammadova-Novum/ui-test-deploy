'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { captchaSchema, forgotPasswordSchema } from '@/lib/schemas';
import { forgotPassword } from '@/services/user';
import { Captcha } from '@/units';
import { shouldShowCaptcha } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ForgotPasswordForm = () => {
  const [captcha, setCaptcha] = useState('');

  const schema = yup.object().shape({
    ...forgotPasswordSchema(),
    ...(shouldShowCaptcha() ? captchaSchema() : {}),
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
    if (shouldShowCaptcha()) {
      setValue('captcha', captcha);
      trigger('captcha');
    }
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
        className="mx-auto flex w-full max-w-[546px] flex-col gap-y-8 rounded-[10px] bg-gray-medium p-10"
        submitButton={{
          text: 'Get a new password',
          variant: 'primary',
          size: 'large',
          className: '!mt-0 w-full',
        }}
        submitAction={onSubmit}
      >
        <div className="flex flex-col gap-y-3">
          <Input
            {...register('email')}
            label="Email"
            placeholder="Enter your email"
            type="email"
            disabled={isSubmitting}
            error={errors.email?.message}
            inputStyles="bg-white"
          />
          {shouldShowCaptcha() && <Captcha onChange={setCaptcha} className="my-0" />}
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
