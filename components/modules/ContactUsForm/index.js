'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TickInCircleSVG from '@/assets/images/checkCircle.svg';
import { FormManager } from '@/common';
import { FormDropdown, Input, PhoneInput, TextArea, Title } from '@/elements';
import { contactInfoSchema } from '@/lib/schemas';
import { contactUs } from '@/services/contactUs';
import { getValueWithPath } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ContactUsForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = yup.object({
    ...contactInfoSchema(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { error } = await contactUs({ data });

    if (!error) setIsSubmitted(true);
    else errorToast(error?.title, error?.message);
  };

  // REMOVED Fill the form again
  // const onSubmitAgain = () => {
  //   reset();
  //   setIsSubmitted(false);
  // };

  const testOption = [
    { label: 'testLabel', value: 'testValue' },
    { label: 'testLabel2', value: 'testValue2' },
  ];

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);

    if (error) clearErrors(key);

    setValue(key, value);
  };

  return isSubmitted ? (
    <div className="m-auto flex flex-col items-center text-center">
      <Title level={2} className="mb-2.5 flex items-center gap-2">
        <TickInCircleSVG className="h-6 w-6 fill-black" viewBox="0 0 24 24" /> Thank you!
      </Title>
      <p className="mb-4 max-w-[240px] text-xsm">
        Your message has been submitted. Someone from our team will contact you.
      </p>
      {/* REMOVED Fill the form again
      
      <Button
        buttonProps={{ text: 'Fill the form again', size: 'large', variant: 'secondary' }}
        onClick={onSubmitAgain}
      /> */}
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
        className="flex w-full flex-col gap-5"
      >
        <Title level="2" className="mb-5">
          Write to us
        </Title>
        <div className="grid gap-y-4">
          <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
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
          <TextArea
            {...register('message')}
            label="Message"
            placeholder="Type your message here"
            inputStyles="h-20"
            error={errors.message?.message}
          />
          <div />
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default ContactUsForm;
