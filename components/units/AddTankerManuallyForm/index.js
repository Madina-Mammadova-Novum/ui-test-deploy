'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { AddTankerManuallyFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Button, DatePicker, FormDropdown, Input, TextWithLabel, Title } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
import { tankerDataSchema } from '@/lib/schemas';
import { getCountries } from '@/services';
import { getPorts } from '@/services/port';
import { addVesselManually, getVesselCategoryOne, getVesselCategoryTwo, getVesselTypes } from '@/services/vessel';
import { ModalHeader } from '@/units';
import Dropzone from '@/units/FileUpload/Dropzone';
import { convertDataToOptions, countriesOptions, getValueWithPath, updateFormats } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const schema = yup.object({
  ...tankerDataSchema(),
});

const AddTankerManuallyForm = ({ closeModal, goBack, id, fleetData, imo }) => {
  const [initialLoading, setInitialLoading] = useState(false);
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
  const [countries, setCountries] = useState([]);
  const [ports, setPorts] = useState([]);

  const { tankerType, tankerCategoryOne, tankerCategoryTwo } = tankerOptions;

  const methods = useHookFormParams({ schema });
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);
  const {
    register,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = methods;
  const { name: fleetName } = fleetData;

  const handleTankerOptionsChange = (key, state) => {
    setTankerOptions((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        ...state,
      },
    }));
  };

  useEffect(() => {
    (async () => {
      setInitialLoading(true);
      const [tankerTypesResponse, countriesResponse, portsResponse] = await Promise.all([
        getVesselTypes(),
        getCountries(),
        getPorts(),
      ]);
      setInitialLoading(false);
      const { data: tankerTypesData = [], error: tankerTypesError } = tankerTypesResponse;
      const { data: countriesData = [], error: countriesError } = countriesResponse;
      const { data: portsData = [], error: portsError } = portsResponse;
      handleTankerOptionsChange('tankerType', {
        options: convertDataToOptions({ data: tankerTypesData }, 'id', 'name'),
      });
      setCountries(countriesOptions({ data: countriesData }));
      setPorts(countriesOptions({ data: portsData }));
      if (tankerTypesError || countriesError || portsError)
        console.log(tankerTypesError || countriesError || portsError);
    })();
  }, []);

  const onSubmit = async (formData) => {
    const { data, error } = await addVesselManually({ data: { ...formData, fleetId: id } });
    if (data) return;
    if (error) console.log(error);
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
      if (categoryOneError) console.log(categoryOneError);
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
      if (categoryTwoError) console.log(categoryTwoError);
    }
  };

  const printHelpers = useMemo(() => {
    return (
      <div className="flex gap-3 h-auto self-end w-full justify-between py-2 text-xs-sm">
        <p>
          <span className="text-gray">Supports:</span> <span>{formats}</span>
        </p>
        <p className="flex gap-2 text-gray whitespace-nowrap self-end">
          Max size: <span>{SETTINGS.FILE_SIZE_RESTRICTION}MB</span>
        </p>
      </div>
    );
  }, [formats]);

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Add tanker', variant: 'primary', size: 'large' }}
      >
        <div className="w-[756px]">
          <ModalHeader goBack={goBack}>Add a New Tanker</ModalHeader>
          <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start [&>p]:!ml-0 mt-5" />

          <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-[12px] my-5">
            <p>
              Unfortunately, the IMO of the Tanker you specified <b>{imo}</b> was not found in our system, please add
              all the required information manually.
            </p>
            <p className="flex mt-1.5">
              If you make a mistake while entering the IMO of the tanker, please
              <Button
                buttonProps={{ text: 'go back', variant: 'primary', size: 'small' }}
                onClick={goBack}
                customStyles="!p-0 !text-[12px] !bg-transparent"
              />{' '}
              and try again.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <div className="grid grid-cols-2 gap-y-4 gap-x-5">
              <Input
                {...register(`tankerName`)}
                label="Tanker name"
                customStyles="w-full"
                error={errors.tankerName?.message}
              />
              <Input {...register(`imo`)} label="IMO" disabled value={imo} customStyles="w-full" />
              <DatePicker
                label="Last Q88 update date"
                name="updateDate"
                onChange={(date) => handleChange('updateDate', date)}
                error={errors.updateDate?.message}
              />
              <Input
                {...register(`built`)}
                type="number"
                label="Built"
                placeholder="YYYY"
                customStyles="w-full"
                error={errors.built?.message}
              />
              <FormDropdown
                label="Port of registry"
                options={ports}
                asyncCall={initialLoading}
                disabled={!ports.length}
                name="portOfRegistry"
                onChange={(option) => handleChange('portOfRegistry', option)}
              />
              <FormDropdown
                label="Country"
                options={countries}
                name="country"
                asyncCall={initialLoading}
                disabled={!countries.length}
                onChange={(option) => handleChange('country', option)}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown
                label="Tanker type"
                options={tankerType.options}
                asyncCall={initialLoading}
                disabled={!tankerType.options.length}
                name="tankerType"
                onChange={(option) => handleChange('tankerType', option)}
              />
              <FormDropdown
                label="Tanker category #1"
                options={tankerCategoryOne.options}
                asyncCall={tankerCategoryOne.loading}
                disabled={!tankerCategoryOne.options.length}
                name="tankerCategoryOne"
                onChange={(option) => handleChange('tankerCategoryOne', option)}
              />
              <FormDropdown
                label="Tanker category #2"
                options={tankerCategoryTwo.options}
                asyncCall={tankerCategoryTwo.loading}
                disabled={!tankerCategoryTwo.options.length}
                name="tankerCategoryTwo"
                onChange={(option) => handleChange('tankerCategoryTwo', option)}
              />
              <FormDropdown
                label="Hull type"
                options={hullTypeOptions}
                name="hullType"
                onChange={(option) => handleChange('hullType', option)}
                customStyles={{ className: 'col-span-2' }}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-baseline">
              <Input
                {...register(`loa`)}
                label="LOA"
                customStyles="w-full"
                type="number"
                placeholder="meters"
                error={errors.loa?.message}
              />
              <Input
                {...register(`beam`)}
                label="Beam"
                customStyles="w-full"
                type="number"
                placeholder="meters"
                error={errors.beam?.message}
              />
              <Input
                {...register(`summerDWT`)}
                label="Summer DWT"
                customStyles="w-full"
                type="number"
                placeholder="tons"
                error={errors.summerDWT?.message}
              />
              <Input
                {...register(`summerDraft`)}
                label="Summer draft"
                customStyles="w-full"
                type="number"
                placeholder="meters"
                error={errors.summerDraft?.message}
              />
              <Input
                {...register(`normalBallastDWT`)}
                label="Normal ballast DWT"
                customStyles="w-full"
                type="number"
                placeholder="tons"
                error={errors.normalBallastDWT?.message}
              />
              <Input
                {...register(`normalBallastDraft`)}
                label="Normal ballast draft"
                customStyles="w-full"
                type="number"
                placeholder="meters"
                error={errors.normalBallastDraft?.message}
              />
              <Input
                {...register(`cubicCapacity`)}
                label="cubic capacity 98%"
                customStyles="w-full"
                type="number"
                placeholder="M"
                error={errors.cubicCapacity?.message}
              />
              <FormDropdown
                label="IMO class"
                options={imoClassOptions}
                name="imoClass"
                onChange={(option) => handleChange('imoClass', option)}
              />
              <Input
                {...register(`grades`)}
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                type="number"
                customStyles="col-span-4"
                error={errors.grades?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 items-baseline">
              <Input
                {...register(`registeredOwner`)}
                label="Registered owner"
                customStyles="w-full"
                error={errors.registeredOwner?.message}
              />
              <FormDropdown
                label="Country"
                options={countries}
                asyncCall={initialLoading}
                disabled={!countries.length}
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
                asyncCall={initialLoading}
                disabled={!countries.length}
                name="technicalOperatorCountry"
                onChange={(option) => handleChange('technicalOperatorCountry', option)}
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
                asyncCall={initialLoading}
                disabled={!countries.length}
                name="commercialOperatorCountry"
                onChange={(option) => handleChange('commercialOperatorCountry', option)}
              />
              <Input
                {...register(`disponentOwner`)}
                label="Disponent owner"
                customStyles="w-full"
                error={errors.disponentOwner?.message}
              />
              <FormDropdown
                label="Country"
                options={countries}
                asyncCall={initialLoading}
                disabled={!countries.length}
                name="disponentOwnerCountry"
                onChange={(option) => handleChange('disponentOwnerCountry', option)}
              />
            </div>
            <div>
              <Title level={4} className="mb-2.5">
                Upload your Q88 questionnaire file (optional)
              </Title>
              <Dropzone areaParams={() => ({})} inputParams={() => ({})}>
                {printHelpers}
              </Dropzone>
            </div>
          </div>
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerManuallyForm.propTypes = AddTankerManuallyFormPropTypes;

export default AddTankerManuallyForm;
