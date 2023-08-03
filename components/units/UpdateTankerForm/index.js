'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { UpdateTankerFormPropTypes } from '@/lib/types';

import { vesselDetailsAdapter } from '@/adapters/vessel';
import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Input, TextWithLabel, Title } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS, unassignedFleetOption } from '@/lib/constants';
import { tankerDataSchema } from '@/lib/schemas';

/* eslint-disable prefer-destructuring */

import { getCountries } from '@/services';
import { getPorts } from '@/services/port';
import {
  addVesselManually,
  getVesselCategoryOne,
  getVesselCategoryTwo,
  getVesselDetails,
  getVesselTypes,
} from '@/services/vessel';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { ModalHeader } from '@/units';
import Dropzone from '@/units/FileUpload/Dropzone';
import { convertDataToOptions, countriesOptions, getValueWithPath, updateFormats } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const schema = yup.object({
  ...tankerDataSchema(),
});

const UpdateTankerForm = ({ closeModal, fleetData = unassignedFleetOption, itemId }) => {
  const [initialLoading, setInitialLoading] = useState(false);
  // const [q88State, setQ88State] = useState(q88);
  const [q88State] = useState({});
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
  const { label: fleetName, value: fleetId } = fleetData;
  const methods = useHookFormParams({ schema });
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);
  const dispatch = useDispatch();
  const {
    register,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = methods;

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
      const [tankerTypesResponse, countriesResponse, portsResponse, vesselDetailsResponse] = await Promise.all([
        getVesselTypes(),
        getCountries(),
        getPorts(),
        getVesselDetails(itemId),
      ]);
      setInitialLoading(false);
      const { data: tankerTypesData = [], error: tankerTypesError } = tankerTypesResponse;
      const { data: countriesData = [], error: countriesError } = countriesResponse;
      const { data: portsData = [], error: portsError } = portsResponse;
      const { data: vesselDetailsData = {}, error: vesselDetailsError } = vesselDetailsResponse;
      // setVesselDetails(vesselDetailsData)
      reset(vesselDetailsAdapter({ data: vesselDetailsData }));
      // setVesselDetails(vesselDetailsAdapter({ data: vesselDetailsData }))
      handleTankerOptionsChange('tankerType', {
        options: convertDataToOptions({ data: tankerTypesData }, 'id', 'name'),
      });
      setCountries(countriesOptions(countriesData));
      setPorts(countriesOptions(portsData));
      if (tankerTypesError || countriesError || portsError || vesselDetailsError)
        console.log(tankerTypesError || countriesError || portsError || vesselDetailsError);

      // if (Object.keys(q88State).length > 1) {
      // }

      // if (Object.keys(q88State).length > 1) {
      //   const validPrefilledOptions = {};
      //   const validPortOfRegistryOption = portsData.find(({ name }) => name === q88.portOfRegistry.label);
      //   const validTankerTypeOption = tankerTypesData.find(({ name }) => name === q88.tankerType.label);
      //   validPrefilledOptions.portOfRegistry = countriesOptions([validPortOfRegistryOption])[0];
      //   validPrefilledOptions.tankerType = convertDataToOptions({ data: [validTankerTypeOption] }, 'id', 'name')[0];
      //   setValue('portOfRegistry', countriesOptions([validPortOfRegistryOption])[0]);
      //   setValue('tankerType', convertDataToOptions({ data: [validTankerTypeOption] }, 'id', 'name')[0]);
      //   if (q88State.tankerCategoryOne) {
      //     const { data: categoryOne } = await getVesselCategoryOne(validPrefilledOptions.tankerType.value);
      //     const validTankerCategoryOneOption = categoryOne.find(
      //       ({ name }) => name === q88State.tankerCategoryOne.label
      //     );
      //     validPrefilledOptions.tankerCategoryOne = convertDataToOptions(
      //       { data: [validTankerCategoryOneOption] },
      //       'id',
      //       'name'
      //     )[0];
      //     setValue(
      //       'tankerCategoryOne',
      //       convertDataToOptions({ data: [validTankerCategoryOneOption] }, 'id', 'name')[0]
      //     );
      //   }
      //   if (q88State.tankerCategoryTwo) {
      //     const { data: categoryTwo } = await getVesselCategoryTwo(validPrefilledOptions.tankerCategoryOne.value);
      //     const validTankerCategoryTwoOption = categoryTwo.find(
      //       ({ name }) => name === q88State.tankerCategoryTwo.label
      //     );
      //     validPrefilledOptions.tankerCategoryTwo = convertDataToOptions(
      //       { data: [validTankerCategoryTwoOption] },
      //       'id',
      //       'name'
      //     )[0];
      //     setValue(
      //       'tankerCategoryTwo',
      //       convertDataToOptions({ data: [validTankerCategoryTwoOption] }, 'id', 'name')[0]
      //     );
      //   }
      //   setQ88State((prevState) => ({ ...prevState, ...validPrefilledOptions }));
      // }
    })();
  }, []);

  const onSubmit = async (formData) => {
    const { status, message, error } = await addVesselManually({ data: { ...formData, fleetId } });
    if (status === 200) {
      dispatch(refetchFleets());
      successToast(message);
      closeModal();
    }
    if (error && error?.message?.Imo) errorToast(error?.message?.Imo);
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

  if (initialLoading) return <div>Loading...</div>;
  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Request to Update Info', variant: 'primary', size: 'large' }}
      >
        <div className="w-[640px] 3md:w-[756px]">
          <ModalHeader>Request to Update Info</ModalHeader>
          <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start [&>p]:!ml-0 mt-5" />

          <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-[12px] my-5">
            <Title level={4}>Please note!</Title>
            <p className="text-[12px] mt-1.5">
              You can edit all the fields if the information is incorrect, but for this you will need to send a request
              to change the data, which can be reviewed up to 24 hours, and after confirmation your data will be updated
              automatically.
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
              <Input {...register(`imo`)} label="IMO" disabled value={q88State.imo} customStyles="w-full" />
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
                step="any"
                placeholder="meters"
                error={errors.loa?.message}
              />
              <Input
                {...register(`beam`)}
                label="Beam"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.beam?.message}
              />
              <Input
                {...register(`summerDWT`)}
                label="Summer DWT"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                error={errors.summerDWT?.message}
              />
              <Input
                {...register(`summerDraft`)}
                label="Summer draft"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.summerDraft?.message}
              />
              <Input
                {...register(`normalBallastDWT`)}
                label="Normal ballast DWT"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                error={errors.normalBallastDWT?.message}
              />
              <Input
                {...register(`normalBallastDraft`)}
                label="Normal ballast draft"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.normalBallastDraft?.message}
              />
              <Input
                {...register(`cubicCapacity`)}
                label="cubic capacity 98%"
                customStyles="w-full"
                type="number"
                step="any"
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
                disabled={!countries.length || !watch('registeredOwner')}
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
                disabled={!countries.length || !watch('technicalOperator')}
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
                disabled={!countries.length || !watch('commercialOperator')}
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
                disabled={!countries.length || !watch('disponentOwner')}
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

UpdateTankerForm.propTypes = UpdateTankerFormPropTypes;

export default UpdateTankerForm;
