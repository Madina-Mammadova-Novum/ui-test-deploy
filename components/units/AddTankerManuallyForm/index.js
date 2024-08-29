'use client';

/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { AddTankerManuallyFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Input, TextWithLabel, Title } from '@/elements';
import { fileSchema, tankerDataSchema } from '@/lib/schemas';
import DropzoneForm from '@/modules/DropzoneForm';
import { getCountries } from '@/services';
import { getPorts } from '@/services/port';
import { addVesselManually, getVesselCategoryOne, getVesselCategoryTwo, getVesselTypes } from '@/services/vessel';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { ImoNotFound, ModalHeader } from '@/units';
import { convertDataToOptions, countriesOptions, getValueWithPath } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const AddTankerManuallyForm = ({ closeModal, goBack, fleetData, q88 }) => {
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(false);
  const [portsLoading, setPortsLoading] = useState(false);
  const [perList, setPerList] = useState(20);
  const [q88State, setQ88State] = useState(q88);
  const [countries, setCountries] = useState([]);
  const [ports, setPorts] = useState([]);

  const [tankerOptions, setTankerOptions] = useState({
    tankerType: {
      options: [],
    },
    tankerCategoryOne: {
      options: [],
      loading: false,
    },
    tankerCategoryTwo: {
      options: [],
      loading: false,
    },
  });

  const tankerCategoryTwoOptions = [...tankerOptions.tankerCategoryTwo.options];

  const schema = yup.object({
    ...tankerDataSchema(tankerCategoryTwoOptions.length > 0),
    ...fileSchema(false),
  });

  const methods = useHookFormParams({ schema, state: q88State });

  const {
    watch,
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = methods;

  const { tankerType, tankerCategoryOne, tankerCategoryTwo } = tankerOptions;
  const { label: fleetName, value: fleetId } = fleetData;

  const handleTankerOptionsChange = (key, state) => {
    setTankerOptions((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        ...state,
      },
    }));
  };

  const onSubmit = async (formData) => {
    const { status, message, error } = await addVesselManually({ data: { ...formData, fleetId } });

    if (status >= 200 && status < 400) {
      dispatch(refetchFleets());
      successToast(message);
      closeModal();
    }

    if (error) {
      errorToast(error?.title, error?.message);
    }
  };

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }
    setValue(key, value);

    if (key === 'tankerType') {
      handleTankerOptionsChange('tankerCategoryOne', { loading: true });
      const {
        status,
        data: tankerCategoryOneData,
        error: categoryOneError,
      } = await getVesselCategoryOne(getValues(key).value);
      handleTankerOptionsChange('tankerCategoryOne', { loading: false });
      if (status === 200) {
        handleTankerOptionsChange('tankerCategoryOne', {
          options: convertDataToOptions({ data: tankerCategoryOneData }, 'id', 'name'),
        });
      }
      if (categoryOneError) console.error(categoryOneError);
    }

    if (key === 'tankerCategoryOne') {
      handleTankerOptionsChange('tankerCategoryTwo', { loading: true });
      const {
        status,
        data: tankerCategoryTwoData,
        error: categoryTwoError,
      } = await getVesselCategoryTwo(getValues(key).value);
      handleTankerOptionsChange('tankerCategoryTwo', { loading: false });
      if (status === 200) {
        handleTankerOptionsChange('tankerCategoryTwo', {
          options: convertDataToOptions({ data: tankerCategoryTwoData }, 'id', 'name'),
        });
      }
      if (categoryTwoError) console.error(categoryTwoError);
    }
  };

  const getPortsData = async () => {
    setPortsLoading(true);
    const { data } = await getPorts({ query: '', pageSize: perList });
    setPorts(dropDownOptionsAdapter({ data }));
    setPortsLoading(false);
  };

  const loadOptions = async (query, callback) => {
    const { data } = await getPorts({ query, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  };

  const handleMore = () => setPerList((prev) => prev + 50);

  const initActions = async () => {
    setInitialLoading(true);
    const [tankerTypesResponse, countriesResponse] = await Promise.all([getVesselTypes(), getCountries()]);

    setInitialLoading(false);

    handleTankerOptionsChange('tankerType', {
      options: convertDataToOptions({ data: tankerTypesResponse?.data }, 'id', 'name'),
    });

    setCountries(countriesOptions(countriesResponse?.data));

    if (Object.keys(q88State).length > 1) {
      const validPrefilledOptions = {};
      const validPortOfRegistryOption = ports.find(({ name }) =>
        name?.toLowerCase().includes(q88?.portOfRegistry?.label.toLowerCase())
      );
      const validTankerTypeOption = tankerTypesResponse?.data?.find(({ name }) => name === q88.tankerType.label);
      validPrefilledOptions.portOfRegistry = countriesOptions([validPortOfRegistryOption])[0];
      validPrefilledOptions.tankerType = convertDataToOptions({ data: [validTankerTypeOption] }, 'id', 'name')[0];
      setValue('portOfRegistry', countriesOptions([validPortOfRegistryOption])[0]);
      setValue('tankerType', convertDataToOptions({ data: [validTankerTypeOption] }, 'id', 'name')[0]);
      if (q88State.tankerCategoryOne) {
        const { data: categoryOne } = await getVesselCategoryOne(validPrefilledOptions.tankerType.value);
        const validTankerCategoryOneOption = categoryOne.find(({ name }) => name === q88State.tankerCategoryOne.label);
        validPrefilledOptions.tankerCategoryOne = convertDataToOptions(
          { data: [validTankerCategoryOneOption] },
          'id',
          'name'
        )[0];
        setValue('tankerCategoryOne', convertDataToOptions({ data: [validTankerCategoryOneOption] }, 'id', 'name')[0]);
      }
      const { data: categoryTwo } = await getVesselCategoryTwo(validPrefilledOptions.tankerCategoryOne.value);
      // const validTankerCategoryTwoOption = categoryTwo.find(({ name }) => name === q88State.tankerCategoryTwo.label);
      validPrefilledOptions.tankerCategoryTwo = convertDataToOptions({ data: [categoryTwo] }, 'id', 'name')[0];
      setValue('tankerCategoryTwo', convertDataToOptions({ data: [categoryTwo] }, 'id', 'name')[0]);
      handleTankerOptionsChange('tankerCategoryTwo', {
        options: convertDataToOptions({ data: categoryTwo }, 'id', 'name'),
      });
      /* if (q88State.tankerCategoryTwo) {
        const { data: categoryTwo } = await getVesselCategoryTwo(validPrefilledOptions.tankerCategoryOne.value);
        const validTankerCategoryTwoOption = categoryTwo.find(({ name }) => name === q88State.tankerCategoryTwo.label);
        validPrefilledOptions.tankerCategoryTwo = convertDataToOptions(
          { data: [validTankerCategoryTwoOption] },
          'id',
          'name'
        )[0];
        setValue('tankerCategoryTwo', convertDataToOptions({ data: [validTankerCategoryTwoOption] }, 'id', 'name')[0]);
      } */
      setQ88State((prevState) => ({ ...prevState, ...validPrefilledOptions }));
    }
  };

  useEffect(() => {
    initActions();
  }, []);

  useEffect(() => {
    getPortsData();
  }, [perList]);

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        className="w-[640px] 3md:w-[756px]"
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Add tanker', variant: 'primary', size: 'large' }}
      >
        <>
          <ModalHeader goBack={goBack}>Add a New Tanker</ModalHeader>
          <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start" />
          {Object.keys(q88State).length < 2 && <ImoNotFound q88={q88State} />}

          <div className="mt-5 grid h-80 grid-cols-1 gap-y-4 overflow-scroll pr-2.5">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Input
                {...register(`tankerName`)}
                label="Tanker name"
                customStyles="w-full"
                error={errors.tankerName?.message}
              />
              <Input
                {...register(`imo`)}
                label="IMO"
                disabled
                value={q88State.imo}
                customStyles="w-full"
                maxLength={7}
              />
              <DatePicker
                label="Last Q88 update date"
                name="updateDate"
                maxDate={new Date()}
                onChange={(date) => handleChange('updateDate', date)}
                error={errors.updateDate?.message}
              />
              <Input
                {...register(`built`)}
                type="number"
                label="Built"
                placeholder="YYYY"
                customStyles="w-full"
                disabled={q88State.built}
                error={errors.built?.message}
              />
              <FormDropdown
                asyncCall
                options={ports}
                name="portOfRegistry"
                label="Port of registry"
                loadOptions={loadOptions}
                onMenuScrollToBottom={handleMore}
                loading={!q88State?.portOfRegistry?.value && portsLoading}
                onChange={(option) => handleChange('portOfRegistry', option)}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown
                asyncCall
                label="Tanker type"
                options={tankerType.options}
                loading={!q88State?.tankerType?.value && initialLoading}
                disabled={!tankerType.options.length || q88State.tankerType}
                name="tankerType"
                onChange={(option) => handleChange('tankerType', option)}
              />
              <FormDropdown
                asyncCall
                label="Tanker category #1"
                options={tankerCategoryOne.options}
                loading={tankerCategoryOne.loading}
                disabled={!tankerCategoryOne.options.length || q88State.tankerCategoryOne}
                name="tankerCategoryOne"
                onChange={(option) => handleChange('tankerCategoryOne', option)}
              />
              <FormDropdown
                asyncCall
                label="Tanker category #2"
                options={tankerCategoryTwo.options}
                loading={tankerCategoryTwo.loading}
                name="tankerCategoryTwo"
                onChange={(option) => handleChange('tankerCategoryTwo', option)}
                disabled={!tankerCategoryTwo.options.length}
              />
              <FormDropdown
                label="Hull type"
                options={hullTypeOptions}
                name="hullType"
                onChange={(option) => handleChange('hullType', option)}
                disabled={q88State.hullType}
                customStyles={{ className: 'col-span-2' }}
              />
            </div>
            <div className="grid grid-cols-4 items-baseline gap-x-5 gap-y-4">
              <Input
                {...register(`loa`)}
                label="LOA"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                disabled={q88State.loa}
                error={errors.loa?.message}
              />
              <Input
                {...register(`beam`)}
                label="Beam"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                disabled={q88State.beam}
                error={errors.beam?.message}
              />
              <Input
                {...register(`summerDWT`)}
                label="Summer DWT"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                disabled={q88State.summerDWT}
                error={errors.summerDWT?.message}
              />
              <Input
                {...register(`summerDraft`)}
                label="Summer draft"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                disabled={q88State.summerDraft}
                error={errors.summerDraft?.message}
              />
              <Input
                {...register(`normalBallastDWT`)}
                label="Normal ballast DWT"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                disabled={q88State.normalBallastDWT}
                error={errors.normalBallastDWT?.message}
              />
              <Input
                {...register(`normalBallastDraft`)}
                label="Normal ballast draft"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                disabled={q88State.normalBallastDraft}
                error={errors.normalBallastDraft?.message}
              />
              <Input
                {...register(`cubicCapacity`)}
                label="cubic capacity 98%"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="M"
                disabled={q88State.cubicCapacity}
                error={errors.cubicCapacity?.message}
              />
              <FormDropdown
                label="IMO class"
                options={imoClassOptions}
                name="imoClass"
                disabled={q88State.imoClass}
                onChange={(option) => handleChange('imoClass', option)}
              />
              <Input
                {...register(`grades`)}
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                type="number"
                customStyles="col-span-4"
                disabled={q88State.grades}
                error={errors.grades?.message}
              />
            </div>
            <div className="grid grid-cols-2 items-baseline gap-x-5 gap-y-4">
              <Input
                {...register(`registeredOwner`)}
                label="Registered owner"
                customStyles="w-full"
                error={errors.registeredOwner?.message}
              />
              <FormDropdown
                label="Country"
                options={countries}
                loading={initialLoading}
                asyncCall
                disabled={!countries.length || q88State.registeredOwnerCountry || !watch('registeredOwner')}
                name="registeredOwnerCountry"
                onChange={(option) => handleChange('registeredOwnerCountry', option)}
              />
              <Input
                {...register(`technicalOperator`)}
                label="Technical operator"
                customStyles="w-full"
                error={errors.technicalOperator?.message}
              />
              <FormDropdown
                label="Country"
                options={countries}
                loading={initialLoading}
                disabled={!countries.length || q88State.technicalOperatorCountry || !watch('technicalOperator')}
                name="technicalOperatorCountry"
                onChange={(option) => handleChange('technicalOperatorCountry', option)}
                asyncCall
              />
              <Input
                {...register(`commercialOperator`)}
                label="Commercial operator"
                customStyles="w-full"
                error={errors.commercialOperator?.message}
              />
              <FormDropdown
                label="Country"
                options={countries}
                loading={initialLoading}
                disabled={!countries.length || q88State.commercialOperatorCountry || !watch('commercialOperator')}
                name="commercialOperatorCountry"
                onChange={(option) => handleChange('commercialOperatorCountry', option)}
                asyncCall
              />
              <Input
                {...register(`disponentOwner`)}
                label="Disponent owner"
                customStyles="w-full"
                error={errors.disponentOwner?.message}
              />
              <FormDropdown
                label="Country"
                name="disponentOwnerCountry"
                options={countries}
                loading={initialLoading}
                disabled={!countries.length || q88State.disponentOwnerCountry || !watch('disponentOwner')}
                onChange={(option) => handleChange('disponentOwnerCountry', option)}
                asyncCall
              />
            </div>
            <div>
              <Title level="4" className="mb-2.5">
                Upload your Q88 questionnaire file (optional)
              </Title>
              <DropzoneForm showTextFields={false} />
            </div>
          </div>
        </>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerManuallyForm.propTypes = AddTankerManuallyFormPropTypes;

export default AddTankerManuallyForm;
