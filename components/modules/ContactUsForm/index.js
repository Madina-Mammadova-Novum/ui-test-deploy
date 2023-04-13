'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Button, Dropdown, Input, TextArea, Title } from '@/elements';

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

const ContactUsForm = () => {
  // todo: setup submit function
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async () => {
    setIsSubmitted(true);
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
        {isSubmitted ? (
          <div className="flex flex-col text-center items-center m-auto">
            <Title level={2} className="mb-2.5">
              Thank you!
            </Title>
            <p className="text-xsm mb-4 max-w-[240px]">
              Your message has been submitted. Someone from our team will contact you shortly.
            </p>
            <Button
              buttonProps={{ text: 'Fill the form again', size: 'large', variant: 'secondary' }}
              onClick={() => {}}
            />
          </div>
        ) : (
          <div className="grid gap-y-4">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Input
                {...register('firstName')}
                label="First name"
                placeholder="Enter your first name"
                disabled={isSubmitting}
              />
              <Input {...register('lastName')} label="Last name" placeholder="Enter your last name" />
              <Input
                {...register('emailAddress')}
                label="Email address"
                placeholder="Enter your email"
                type="email"
                error={errors.email?.message}
              />
              <Input {...register('phoneNumber')} label="Phone number" placeholder="Enter your phone number" />
            </div>
            <Dropdown label="subject" onChange={() => {}} name="1" options={['1', '2', '3']} />
            <TextArea name="label" label="MESSAGE" />
          </div>
        )}
      </FormManager>
    </FormProvider>
  );
};

export default ContactUsForm;
