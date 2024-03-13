'use client';

import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { loginSchema } from '@/lib/schemas';
import { signIn } from '@/store/entities/auth/actions';
import { getAuthSelector } from '@/store/selectors';
import { generateRedirectPath, resetObjectFields } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object().shape({ ...loginSchema() });
  const { error, session, loading } = useSelector(getAuthSelector);

  const methods = useHookFormParams({ schema });

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (error) {
      errorToast(error.title, 'Incorrect email or password');
    }

    if (session?.accessToken) {
      const { path } = generateRedirectPath({ role: session.role });
      router.push(path);
    }
  }, [error, session?.accessToken, session?.role]);

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields(formValues, '');
      return formValues;
    });
  };

  const onSubmit = (data) => {
    dispatch(signIn({ data }));
    handleResetFields();
    router.refresh();
  };

  const handlePassword = (event) => {
    clearErrors('password');
    const { value } = event.target;
    setValue('password', value);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          disabled: loading,
          text: 'Log in',
          variant: 'primary',
          size: 'large',
          className: 'mt-0 w-full',
        }}
        className="pt-5 flex flex-col gap-y-5"
        submitAction={onSubmit}
      >
        <Input
          {...register('email')}
          label="Email"
          placeholder="Enter your email"
          type="email"
          disabled={isSubmitting}
          error={errors?.email?.message}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          onChange={handlePassword}
          error={errors?.password?.message}
        />
      </FormManager>
    </FormProvider>
  );
};

export default LoginForm;
