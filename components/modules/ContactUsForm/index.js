'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormManager } from '@/common';
import { Dropdown, Input, TextArea } from '@/elements';

const ContactUsForm = () => {
  const methods = useForm();

  const {
    register
  } = methods;
  const onSubmit = async () => {};

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
              placeholder="Enter your first name"
            />
            <Input
              {...register('lastName')}
              label="Last name"
              placeholder="Enter your last name"
            />
            <Input
              {...register('emailAddress')}
              label="EMAIL ADDRESS"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              {...register('phoneNumber')}
              label="phone number"
              placeholder="Enter your phone number"
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
