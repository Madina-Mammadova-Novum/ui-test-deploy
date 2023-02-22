import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import StepWrapper from './StepWrapper';

import { Input, Tabs } from '@/elements';

const Step = ({ title, number }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const params = {
    tabs: [
      {
        id: 1,
        label: 'I am vessel owner',
        value: 'owner',
      },
      {
        id: 2,
        label: 'I am a charterer',
        value: 'charterer',
      },
    ],
  };

  const printStep1 = useMemo(() => {
    return <Tabs tabs={params.tabs} defaultTab={params.tabs[0].value} activeTab={null} />;
  }, [params.tabs]);

  const printStep2 = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        <Input
          type="text"
          label="first name"
          placeholder="John"
          name="firstName"
          register={register}
          error={errors?.firstName?.message}
          required
        />
        <Input
          type="text"
          label="last name"
          placeholder="Doe"
          name="lastName"
          register={register}
          error={errors?.lastName?.message}
          required
        />
        <Input
          type="mail"
          label="email address"
          placeholder="example@.com"
          name="email"
          register={register}
          error={errors?.email?.message}
          required
        />
      </div>
    );
  }, [errors?.email?.message, errors?.firstName?.message, errors?.lastName?.message, register]);

  const printStep3 = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        <Input type="text" label="company name" placeholder="Company" />
        <Input type="number" label="years of operation" placeholder="years" />
      </div>
    );
  }, []);

  const printStep4 = useMemo(() => {
    return (
      <div className="grid grid-cols-2">
        <Input type="number" label="Number of tankers" placeholder="tankers" />
      </div>
    );
  }, []);

  const printStep5 = useMemo(() => {
    return null;
  }, []);

  const printStep = ({ ...rest }) => {
    let CurrentStep;

    switch (number) {
      case '1':
        CurrentStep = () => printStep1;
        break;
      case '2':
        CurrentStep = () => printStep2;
        break;
      case '3':
        CurrentStep = () => printStep3;
        break;
      case '4':
        CurrentStep = () => printStep4;
        break;
      case '5':
        CurrentStep = () => printStep5;
        break;

      default:
        return null;
    }

    return CurrentStep ? <CurrentStep key={number} {...rest} /> : null;
  };

  return (
    <StepWrapper title={title} number={number}>
      {printStep(number)}
    </StepWrapper>
  );
};

Step.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Step;
