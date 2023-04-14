'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Button, FormDropdown, Input, PhoneInput, TextArea, Title } from '@/elements';
import { contactInfoSchema } from '@/lib/schemas';
import { getValueWithPath } from "@/utils/helpers";

const schema = yup.object({
  ...contactInfoSchema(),
});

const ContactUsForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = methods;

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    return data;
  };

  const onSubmitAgain = () => {
    reset();
    setIsSubmitted(false);
  };
  const testOption = [{ label: 'testLabel', value: 'testValue' }, { label: 'testLabel2', value: 'testValue2' }];

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);
    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  return isSubmitted ? (
    <div className="flex flex-col text-center items-center m-auto">
      <Title level={2} className="mb-2.5">
        Thank you!
      </Title>
      <p className="text-xsm mb-4 max-w-[240px]">
        Your message has been submitted. Someone from our team will contact you shortly.
      </p>
      <Button
        buttonProps={{ text: 'Fill the form again', size: 'large', variant: 'secondary' }}
        onClick={onSubmitAgain}
      />
    </div>
  ) : (
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
        <Title level={2} className="mb-5">
          Write to us
        </Title>
        <div className="grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <Input
              {...register('firstName')}
              label="First name"
              placeholder="John"
              disabled={isSubmitting}
              error={errors.firstName?.message}
            />
            <Input {...register('lastName')} label="Last name" placeholder="Doe" error={errors.lastName?.message} />
            <Input
              {...register('email')}
              label="Email address"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
            />
            <PhoneInput
              {...register('phoneNumber')}
              label=" Phone number"
              disabled={isSubmitting}
              error={errors.phoneNumber?.message}
            />
          </div>
          <FormDropdown
            label="Subject"
            defaultValue="Some category"
            name="subject"
            options={testOption}
            onChange={(option) => handleChange('subject', option)}
            error={errors.subject?.message}
          />
          <TextArea name="message" label="Message" placeholder="Type your message here" inputStyles="h-20"/>
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default ContactUsForm;
