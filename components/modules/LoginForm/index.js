'use client';

import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { CheckBoxInput, Input, NextLink, PasswordInput } from '@/elements';
import { ROUTES } from '@/lib';
import { loginSchema } from '@/lib/schemas';
import { signIn } from '@/store/entities/auth/actions';
import { clearError } from '@/store/entities/auth/slice';
import { getAuthSelector } from '@/store/selectors';
import { generateRedirectPath, resetObjectFields } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object().shape({ ...loginSchema() });
  const { error, session, loading } = useSelector(getAuthSelector);

  const methods = useHookFormParams({
    schema,
    state: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const rememberMe = watch('rememberMe', false);

  useEffect(() => {
    if (error) {
      errorToast(error.title, 'Incorrect email or password');
      dispatch(clearError());
    }

    if (session?.accessToken) {
      const { path } = generateRedirectPath({ role: session.role });
      router.push(path);
    }
  }, [error, session?.accessToken, session?.role]);

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields({ initialObject: formValues, resetType: '' });
      return formValues;
    });
  };

  const onSubmit = (data) => {
    // Store remember me preference in localStorage
    localStorage.setItem('remember-me', data.rememberMe);

    dispatch(signIn({ data }));
    handleResetFields();
    router.refresh();
  };

  const handlePassword = (event) => {
    clearErrors('password');
    const { value } = event.target;
    setValue('password', value);
  };

  const handleRememberMe = (event) => {
    clearErrors('rememberMe');
    const { checked } = event.target;
    setValue('rememberMe', checked);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          disabled: loading,
          text: 'Log in',
          variant: 'primary',
          size: 'large',
          className: '!mt-0 w-full',
        }}
        className="mx-auto flex w-full max-w-[546px] flex-col gap-y-8 rounded-[10px] bg-gray-medium p-10"
        submitAction={onSubmit}
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-4">
            <Input
              {...register('email')}
              label="Email"
              placeholder="Enter your email"
              type="email"
              disabled={isSubmitting}
              error={errors?.email?.message}
              inputStyles="bg-white"
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              disabled={isSubmitting}
              onChange={handlePassword}
              error={errors?.password?.message}
              inputStyles="bg-white"
            />
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
            <CheckBoxInput
              name="rememberMe"
              onChange={handleRememberMe}
              checked={rememberMe}
              labelStyles="text-black text-xsm"
              boxStyles="!gap-x-2 !h-5"
            >
              Remember me
            </CheckBoxInput>
            <NextLink href={ROUTES.FORGOT_PASSWORD} className="text-xsm font-medium text-blue underline">
              Forgot your password
            </NextLink>
          </div>
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default LoginForm;
