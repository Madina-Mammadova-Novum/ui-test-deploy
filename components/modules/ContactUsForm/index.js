'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Dropdown, Input, TextArea } from '@/elements';
import { forgotPassword } from '@/services/user';
import { successToast } from '@/utils/hooks';

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

const ContactUsForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    register,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data) => {
    const { message } = await forgotPassword({ data });
    successToast(message, 'Some description');
    reset();
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          text: 'Send Message',
          variant: 'secondary',
          size: 'large',
          className: '!w-fit self-baseline',
        }}
        submitAction={onSubmit}
      >
        <div className="grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <Input
              {...register('firstName')}
              label="first name"
              placeholder="Enter your "
              type="email"
              disabled={isSubmitting}
              error={errors.email?.message}
            />
            <Input
              {...register('firstName')}
              label="first name"
              placeholder="Enter your "
              type="email"
              disabled={isSubmitting}
              error={errors.email?.message}
            />
            <Input
              {...register('firstName')}
              label="first name"
              placeholder="Enter your "
              type="email"
              disabled={isSubmitting}
              error={errors.email?.message}
            />
            <Input
              {...register('firstName')}
              label="first name"
              placeholder="Enter your "
              type="email"
              disabled={isSubmitting}
              error={errors.email?.message}
            />
          </div>
          <Dropdown label="subject" onChange={() => {}} name="1" options={['1', '2', '3']} />
          <TextArea name="label" label="MESSAGE" />
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default ContactUsForm;
