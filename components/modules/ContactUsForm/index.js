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

  const subjectOptions = [
    { label: 'General Inquiry', value: 'General Inquiry' },
    { label: 'Registration Help', value: 'Registration Help' },
    { label: 'Technical Issue / Bug', value: 'Technical Issue / Bug' },
  ];

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);

    if (error) clearErrors(key);

    setValue(key, value);
  };

  return isSubmitted ? (
    <div className="m-auto flex flex-col items-center rounded-base bg-white px-4 py-8 text-center md:px-5 3md:max-w-[35.75rem]">
      <Title level={2} className="mb-2.5 flex items-center gap-2">
        <TickInCircleSVG className="h-6 w-6 fill-black" viewBox="0 0 24 24" /> Thank you!
      </Title>
      <p className="text-xsm">Your message has been submitted. Someone from our team will contact you.</p>
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
          variant: 'primary',
          size: 'large',
          className: 'self-baseline !mt-0 w-full !font-medium md:w-fit',
        }}
        submitAction={onSubmit}
        className="flex w-full flex-col gap-8 rounded-base bg-white px-4 py-8 md:px-5 3md:max-w-[35.75rem]"
      >
        <div className="grid gap-y-4">
          <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
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
            name="subject"
            options={subjectOptions}
            onChange={(option) => handleChange('subject', option)}
            error={errors.subject?.message}
          />
          <TextArea
            {...register('message')}
            label="Message"
            placeholder="Type your message"
            inputStyles="h-20 min-w-max"
            error={errors.message?.message}
          />
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default ContactUsForm;
