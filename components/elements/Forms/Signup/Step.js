import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import PropTypes from 'prop-types';

import StepWrapper from './StepWrapper';

import { Button, CheckBox, Dropdown, Input, Tabs } from '@/elements';
import { PasswordValidation } from '@/ui';
import { dropdownOptions } from '@/utils/mock';

import 'react-phone-input-2/lib/style.css';

const Step = ({ title, number }) => {
  const { register, resetField, formState, setValue, control } = useFormContext();
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

  const [activeTab, setActiveTab] = useState(params.tabs[0].value);
  const [address, setAddress] = useState(false);
  const [rule, setRule] = useState(false);
  const [tankers, setTankers] = useState(null);

  const [arr, setArr] = useState([]);

  const handleRule = useCallback(() => {
    setRule((prev) => !prev);
    setValue('params.rule', !rule);
  }, [rule, setValue]);

  const handleAddress = useCallback(() => {
    setAddress((prev) => !prev);
    setValue('params.address', !address);
    if (address) {
      resetField('address.secondary.line.one');
      resetField('address.secondary.line.two');
      resetField('address.secondary.city');
      resetField('address.secondary.state');
      resetField('address.secondary.zip');
    }
  }, [address, resetField, setValue]);

  useEffect(() => {
    setValue('role', activeTab);
  }, []);

  const handleActiveTab = useCallback(
    (value) => {
      setActiveTab(value);
      setValue('role', value);
    },
    [setValue]
  );

  const handleTankers = useCallback((value) => {
    setTankers(parseInt(value, 10));
  }, []);

  const applyTankers = useCallback(() => {
    setArr([tankers]);
  }, [tankers]);

  const printStep1 = useMemo(() => {
    return (
      <Tabs
        tabs={params.tabs}
        onClick={({ target }) => handleActiveTab(target.value)}
        activeTab={activeTab}
        defaultTab={activeTab}
      />
    );
  }, [activeTab, handleActiveTab, params.tabs]);

  const printStep2 = useMemo(() => {
    return (
      <div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="text"
            label="first name"
            placeholder="John"
            name="user.name"
            register={register}
            error={errors.user?.name?.message}
            required
          />
          <Input
            type="text"
            label="last name"
            placeholder="Doe"
            name="user.surname"
            register={register}
            error={errors.user?.surname?.message}
            required
          />
          <Input
            type="mail"
            label="email address"
            placeholder="example@.com"
            name="user.email"
            register={register}
            error={errors.user?.email?.message}
            required
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-black w- font-semibold b-l text-sm pt-5">Provide contact phone numbers to contact you</p>
          <div className="flex gap-5">
            <Controller
              control={control}
              name="user.phone.primary"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <div className="w-full">
                  <p className="block text-gray text-[12px] font-semibold uppercase text-left">primary phone number</p>
                  <PhoneInput
                    {...field}
                    inputExtraProps={{
                      ref,
                      required: true,
                      autoFocus: true,
                    }}
                    country="gb"
                    inputClass={`!border-l-0 !pl-[72px] !w-full
                    ${errors.user?.phone?.primary ? '!border-red' : '!border-gray-darker'}`}
                    buttonClass={`!border-r-0 !bg-purple-light 
                    ${errors.user?.phone?.primary ? '!border-red' : '!border-gray-darker'}`}
                    placeholder="000-000-000"
                    enableAreaCodes
                    enableSearch
                  />
                  {errors.user?.phone?.primary && (
                    <p className="text-[12px] text-red">{errors.user?.phone?.primary?.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="user.phone.secondary"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <div className="w-full">
                  <p className="block text-gray text-[12px] font-semibold uppercase text-left">
                    secondary phone number (optional)
                  </p>
                  <PhoneInput
                    {...field}
                    inputExtraProps={{
                      ref,
                      required: true,
                      autoFocus: true,
                    }}
                    country="gb"
                    inputClass="!border-gray-darker !border-l-0 !pl-[72px] !w-full"
                    buttonClass="!border-r-0 !border-gray-darker !bg-purple-light"
                    placeholder="000-000-000"
                    enableAreaCodes
                    enableSearch
                  />
                </div>
              )}
            />
          </div>
          <div>
            <p className="text-black font-semibold text-sm pt-5">
              Enter a strong password according to our requirements
            </p>
            <PasswordValidation />
          </div>
        </div>
      </div>
    );
  }, [
    control,
    errors.user?.email?.message,
    errors.user?.name?.message,
    errors.user?.phone?.primary,
    errors.user?.surname?.message,
    register,
  ]);

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
      <>
        <div className="grid grid-cols-2 relative">
          <Input
            type="number"
            label="Number of tankers"
            value={tankers}
            onChange={handleTankers}
            placeholder="tankers"
            customStyles="z-10"
          />

          <Button
            type="button"
            buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
            onClick={applyTankers}
            customStyles="absolute top-[18px] left-[42%] my-1 z-40"
          />
        </div>
        <ul>
          {Array.from({ length: arr }, (_, index) => (
            <Input
              type="number"
              label="IMO"
              name={`tankers.container_${index + 1}`}
              register={register}
              key={index + 1}
            />
          ))}
        </ul>
      </>
    );
  }, [applyTankers, arr, handleTankers, register, tankers]);

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
          <CheckBox
            label="I agree with all"
            checked={rule}
            onChange={handleRule}
            labelStyles="text-black inline-flex gap-1 text-xsm"
          >
            <p>Privacy Policy and Terms of Use</p>
          </CheckBox>
        </div>
      </div>
    );
  }, [
    register,
    errors.address?.primary?.line?.one?.message,
    errors.address?.primary?.city?.message,
    errors.address?.primary?.country?.message,
    errors.address?.secondary?.line?.one?.message,
    errors.address?.secondary?.city?.message,
    control,
    handleAddress,
    address,
    rule,
    handleRule,
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
