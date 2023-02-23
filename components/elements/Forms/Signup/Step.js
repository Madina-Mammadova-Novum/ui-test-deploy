import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import StepWrapper from './StepWrapper';

import { CheckBox, Dropdown, Input, Tabs } from '@/elements';
import { dropdownOptions } from '@/utils/mock';

const Step = ({ title, number }) => {
  const { register, resetField, formState, setValue, control } = useFormContext();
  const { errors } = formState;

  const [address, setAddress] = useState(false);

  const handleAddress = useCallback(() => {
    setAddress((prev) => !prev);
    if (address) {
      resetField('address.secondary.line.one');
      resetField('address.secondary.line.two');
      resetField('address.secondary.city');
      resetField('address.secondary.state');
      resetField('address.secondary.zip');
    }
  }, [address, resetField]);

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

  const [activeTab, setActiveTab] = useState(params.tabs[0].value);

  const handleActiveTab = useCallback(
    (value) => {
      setActiveTab(value);
      setValue('role', value);
    },
    [setValue]
  );

  const printStep1 = useMemo(() => {
    return <Tabs tabs={params.tabs} onClick={({ target }) => handleActiveTab(target.value)} activeTab={activeTab} />;
  }, [activeTab, handleActiveTab, params.tabs]);

  const printStep2 = useMemo(() => {
    return (
      <div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="text"
            label="first name"
            placeholder="John"
            name="name"
            register={register}
            error={errors.name?.message}
            required
          />
          <Input
            type="text"
            label="last name"
            placeholder="Doe"
            name="surname"
            register={register}
            error={errors.surname?.message}
            required
          />
          <Input
            type="mail"
            label="email address"
            placeholder="example@.com"
            name="email"
            register={register}
            error={errors.email?.message}
            required
          />
        </div>
        <div>
          <p className="text-black font-semibold text-sm pt-5">Provide contact phone numbers to contact you</p>
        </div>
      </div>
    );
  }, [errors.email?.message, errors.name?.message, errors.surname?.message, register]);

  const printStep3 = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        <Input
          type="text"
          label="company name"
          placeholder="Company"
          name="company.name"
          register={register}
          error={errors.company?.name?.message}
          required
        />
        <Input
          type="number"
          label="years of operation"
          placeholder="years"
          name="company.years"
          error={errors.company?.years?.message}
          register={register}
          required
        />
      </div>
    );
  }, [errors.company?.name?.message, errors.company?.years?.message, register]);

  const printStep4 = useMemo(() => {
    return (
      <div className="grid grid-cols-2">
        <Input
          type="number"
          label="Number of tankers"
          name="tankers"
          placeholder="tankers"
          error={errors.tankers?.message}
          register={register}
          required
        />
      </div>
    );
  }, [errors.tankers?.message, register]);

  const printStep5 = useMemo(() => {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5">
          <p className="text-black font-semibold text-sm">Сompany registration address</p>
          <Input
            type="text"
            label="ADDRESS LINE #1"
            placeholder="Apartment, suite, unit, building, floor, etc."
            register={register}
            name="address.primary.line.one"
            error={errors.address?.primary?.line?.one?.message}
            required
          />
          <Input
            type="text"
            label="ADDRESS LINE #2 (OPTIONAL)"
            name="address.primary.line.two"
            placeholder="Apartment, suite, unit, building, floor, etc."
            register={register}
          />
          <div className="grid grid-cols-2 gap-5">
            <Input
              type="text"
              label="city"
              placeholder="New York"
              name="address.primary.city"
              error={errors.address?.primary?.city?.message}
              register={register}
              required
            />
            <Input
              type="text"
              name="address.primary.state"
              label="STATE / PROVINCE / REGION (OPTIONAL)"
              placeholder="NY"
              register={register}
            />
            <Input
              type="text"
              label="ZIP / POSTAL CODE (OPTIONAL)"
              placeholder="10012"
              name="address.primary.zip"
              register={register}
            />
            <Dropdown
              label="COUNTRY"
              control={control}
              name="address.primary.country"
              error={errors.address?.primary?.country?.message}
              dropdownOptions={dropdownOptions}
            />
            <div className="col-span-2 row-auto">
              <CheckBox
                label="The company Registration Address is the same as the Correspondence Address"
                labelStyles="text-black text-xsm"
                onChange={handleAddress}
                checked={address}
              />
            </div>
          </div>
        </div>
        {!address && (
          <div className="grid grid-cols-1 gap-5">
            <p className="text-black font-semibold text-sm">Company correspondence address</p>
            <Input
              type="text"
              label="ADDRESS LINE #1"
              placeholder="Apartment, suite, unit, building, floor, etc."
              register={register}
              name="address.secondary.line.one"
              error={!address && errors.address?.secondary?.line?.one?.message}
              required={address}
            />
            <Input
              type="text"
              label="ADDRESS LINE #2 (OPTIONAL)"
              placeholder="Apartment, suite, unit, building, floor, etc."
              name="address.secondary.line.two"
              register={register}
            />
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                label="CITY"
                placeholder="New York"
                name="address.secondary.city"
                register={register}
                error={!address && errors.address?.secondary?.city?.message}
                required={address}
              />
              <Input
                type="text"
                label="STATE / PROVINCE / REGION (OPTIONAL)"
                placeholder="NY"
                name="address.secondary.state"
                register={register}
              />
              <Input
                type="text"
                label="ZIP / POSTAL CODE (OPTIONAL)"
                placeholder="10012"
                name="address.secondary.zip"
                register={register}
              />
              {/* <Dropdown label="COUNTRY" dropdownOptions={dropdownOptions} /> */}
            </div>
          </div>
        )}
        <div className="col-span-2 row-auto">
          <CheckBox label="I agree with all" labelStyles="text-black inline-flex gap-1 text-xsm">
            <p>Privacy Policy and Terms of Use</p>
          </CheckBox>
        </div>
      </div>
    );
  }, [
    register,
    handleAddress,
    errors.address?.primary?.line?.one?.message,
    errors.address?.primary?.city?.message,
    errors.address?.primary?.country?.message,
    errors.address?.secondary?.line?.one?.message,
    errors.address?.secondary?.city?.message,
    control,
    address,
  ]);

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
