'use client';

/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import debounce from 'lodash/debounce';
import * as yup from 'yup';

import { AddTankerManuallyFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Input, TextWithLabel } from '@/elements';
import { fileSchema, tankerDataSchema } from '@/lib/schemas';
import { getCountries } from '@/services';
import { getPorts } from '@/services/port';
import { addVesselManually, getVesselCategoryOne, getVesselCategoryTwo, getVesselTypes } from '@/services/vessel';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { ModalHeader, Q88FileUpload } from '@/units';
import { convertDataToOptions, countriesOptions, getValueWithPath } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const AddTankerManuallyForm = ({ closeModal, goBack, fleetData, q88 }) => {
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(false);
  const [portsLoading, setPortsLoading] = useState(false);
  const [perList, setPerList] = useState(20);
  const [q88State] = useState(q88);
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
    ...fileSchema(),
  });

  const methods = useHookFormParams({
    schema,
    state: {
      ...q88State,
      file: q88State.file || '',
    },
  });

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
    const { status, message, error } = await addVesselManually({
      data: { ...formData, fleetId },
      vesselId: q88State.vesselId,
    });

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
      // Reset dependent fields when tanker type changes
      setValue('tankerCategoryOne', null);
      setValue('tankerCategoryTwo', null);
      clearErrors('tankerCategoryOne');
      clearErrors('tankerCategoryTwo');
      handleTankerOptionsChange('tankerCategoryTwo', { options: [] });

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
      // Reset dependent field when tanker category one changes
      setValue('tankerCategoryTwo', null);
      clearErrors('tankerCategoryTwo');

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

  const debouncedLoadOptions = debounce(async (query, callback) => {
    const { data } = await getPorts({ query, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  }, 400);

  const loadOptions = (query, callback) => {
    if (!query) {
      callback(ports);
      return;
    }
    debouncedLoadOptions(query, callback);
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
  };

  useEffect(() => {
    initActions();
  }, []);

  useEffect(() => {
    getPortsData();
  }, [perList]);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

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

          <div className="mt-5 grid h-80 grid-cols-1 gap-y-4 overflow-scroll pr-2.5 3md:h-[26.25rem]">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Input
                {...register(`tankerName`)}
                label="Tanker name"
                labelBadge="*"
                customStyles="w-full"
                error={errors.tankerName?.message}
              />
              <Input
                {...register(`imo`)}
                label="IMO"
                labelBadge="*"
                disabled
                value={q88State.imo}
                customStyles="w-full"
                maxLength={7}
              />
              <DatePicker
                label="Last Q88 update date"
                labelBadge="*"
                name="updateDate"
                maxDate={new Date()}
                onChange={(date) => handleChange('updateDate', date)}
                error={errors.updateDate?.message}
              />
              <Input
                {...register(`built`)}
                type="number"
                label="Built"
                labelBadge="*"
                placeholder="YYYY"
                customStyles="w-full"
                error={errors.built?.message}
              />
              <FormDropdown
                asyncCall
                options={ports}
                name="portOfRegistry"
                label="Flag/Port of registry"
                labelBadge="*"
                loadOptions={loadOptions}
                onMenuScrollToBottom={handleMore}
                loading={portsLoading}
                onChange={(option) => handleChange('portOfRegistry', option)}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown
                asyncCall
                label="Tanker type"
                labelBadge="*"
                options={tankerType.options}
                loading={initialLoading}
                disabled={!tankerType.options.length}
                name="tankerType"
                onChange={(option) => handleChange('tankerType', option)}
              />
              <FormDropdown
                asyncCall
                label="Tanker category #1"
                labelBadge="*"
                options={tankerCategoryOne.options}
                loading={tankerCategoryOne.loading}
                disabled={!tankerCategoryOne.options.length}
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
                labelBadge="*"
                options={hullTypeOptions}
                name="hullType"
                onChange={(option) => handleChange('hullType', option)}
                customStyles={{ className: 'col-span-2' }}
              />
            </div>
            <div className="grid grid-cols-4 items-baseline gap-x-5 gap-y-4">
              <Input
                {...register(`loa`)}
                label="LOA"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.loa?.message}
              />
              <Input
                {...register(`beam`)}
                label="Beam"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.beam?.message}
              />
              <Input
                {...register(`summerDWT`)}
                label="Summer DWT"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                error={errors.summerDWT?.message}
              />
              <Input
                {...register(`summerDraft`)}
                label="Summer draft"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.summerDraft?.message}
              />
              <Input
                {...register(`normalBallastDWT`)}
                label="Normal ballast DWT"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                error={errors.normalBallastDWT?.message}
              />
              <Input
                {...register(`normalBallastDraft`)}
                label="Normal ballast draft"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.normalBallastDraft?.message}
              />
              <Input
                {...register(`cubicCapacity`)}
                label="cubic capacity 98%"
                labelBadge="*"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="M"
                error={errors.cubicCapacity?.message}
              />
              <FormDropdown
                label="IMO class"
                labelBadge="*"
                options={imoClassOptions}
                name="imoClass"
                onChange={(option) => handleChange('imoClass', option)}
              />
              <Input
                {...register(`grades`)}
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                labelBadge="*"
                type="number"
                customStyles="col-span-4"
                error={errors.grades?.message}
              />
            </div>
            <div className="grid grid-cols-2 items-baseline gap-x-5 gap-y-4">
              <Input
                {...register(`registeredOwner`)}
                label="Registered owner"
                labelBadge="*"
                customStyles="w-full"
                error={errors.registeredOwner?.message}
              />

              <FormDropdown
                label="Country"
                labelBadge="*"
                options={countries}
                loading={initialLoading}
                asyncCall
                disabled={!countries.length || !watch('registeredOwner')}
                name="registeredOwnerCountry"
                onChange={(option) => handleChange('registeredOwnerCountry', option)}
              />
              <Input
                {...register(`technicalOperator`)}
                label="Technical operator"
                labelBadge="*"
                customStyles="w-full"
                error={errors.technicalOperator?.message}
              />
              <FormDropdown
                label="Country"
                labelBadge="*"
                options={countries}
                loading={initialLoading}
                disabled={!countries.length || !watch('technicalOperator')}
                name="technicalOperatorCountry"
                onChange={(option) => handleChange('technicalOperatorCountry', option)}
                asyncCall
              />
              <Input
                {...register(`commercialOperator`)}
                label="Commercial operator"
                labelBadge="*"
                customStyles="w-full"
                error={errors.commercialOperator?.message}
              />

              <FormDropdown
                label="Country"
                labelBadge="*"
                options={countries}
                loading={initialLoading}
                disabled={!countries.length || !watch('commercialOperator')}
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
                disabled={!countries.length || !watch('disponentOwner')}
                onChange={(option) => handleChange('disponentOwnerCountry', option)}
                asyncCall
              />
            </div>
            <div>
              <Q88FileUpload
                setValue={setValue}
                clearErrors={clearErrors}
                setError={methods.setError}
                watch={watch}
                error={errors?.file?.message}
                name="file"
              />
            </div>
          </div>
        </>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerManuallyForm.propTypes = AddTankerManuallyFormPropTypes;

export default AddTankerManuallyForm;
