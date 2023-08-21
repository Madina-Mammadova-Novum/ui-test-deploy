'use client';

/* eslint-disable prefer-destructuring */

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { UpdateTankerFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Input, Loader, TextWithLabel, Title } from '@/elements';
import { unassignedFleetOption } from '@/lib/constants';
import { fileSchema, tankerDataSchema } from '@/lib/schemas';
import DropzoneForm from '@/modules/DropzoneForm';
import { getVesselCategoryOne, getVesselCategoryTwo, requestUpdateVessel } from '@/services/vessel';
import { fetchPrefilledDataToUpdate } from '@/store/entities/fleets/actions';
import { clearPrefilledState, refetchFleets } from '@/store/entities/fleets/slice';
import { fleetsSelector } from '@/store/selectors';
import { ModalHeader } from '@/units';
import { convertDataToOptions, getValueWithPath, parseErrors } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const schema = yup.object({
  ...tankerDataSchema(),
  ...fileSchema(),
});

const UpdateTankerForm = ({ closeModal, fleetData = unassignedFleetOption, itemId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    prefilledUpdateVesselState: { loading, data: prefilledData, ports, countries, tankerTypes },
  } = useSelector(fleetsSelector);
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

  const { tankerType, tankerCategoryOne, tankerCategoryTwo } = tankerOptions;
  const { label: fleetName } = fleetData;
  const methods = useHookFormParams({ schema });
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
    dispatch(fetchPrefilledDataToUpdate(itemId));
    return () => dispatch(clearPrefilledState());
  }, []);

  useEffect(() => {
    if (!loading) {
      (async () => {
        const validPrefilledOptions = {};
        if (prefilledData.tankerCategoryOne.value) {
          const { data: categoryOne } = await getVesselCategoryOne(prefilledData.tankerType.value);
          handleTankerOptionsChange('tankerCategoryOne', {
            options: convertDataToOptions({ data: categoryOne }, 'id', 'name'),
          });
          const validCategotyOneOption = categoryOne.find(({ id }) => id === prefilledData.tankerCategoryOne.value);
          validPrefilledOptions.tankerCategoryOne = convertDataToOptions(
            { data: [validCategotyOneOption] },
            'id',
            'name'
          )[0];
        }
        if (prefilledData.tankerCategoryTwo?.value) {
          const { data: categoryTwo } = await getVesselCategoryTwo(prefilledData.tankerCategoryOne.value);
          handleTankerOptionsChange('tankerCategoryTwo', {
            options: convertDataToOptions({ data: categoryTwo }, 'id', 'name'),
          });
          const validCategotyTwoOption = categoryTwo.find(({ id }) => id === prefilledData.tankerCategoryTwo?.value);
          validPrefilledOptions.tankerCategoryTwo = convertDataToOptions(
            { data: [validCategotyTwoOption] },
            'id',
            'name'
          )[0];
        }

        reset({ ...prefilledData, ...validPrefilledOptions });
        handleTankerOptionsChange('tankerType', { options: tankerTypes });
        setInitialLoading(false);
      })();
    }
  }, [loading]);

  const onSubmit = async (formData) => {
    const { status, message, messageDescription, error } = await requestUpdateVessel({
      data: { ...formData, tankerId: itemId },
    });
    if (status === 200) {
      dispatch(refetchFleets());
      successToast(message, messageDescription);
      closeModal();
    }
    if (error) {
      const { errors: requestUpdateErrors, message: requestUpdateMessage } = error;
      errorToast(parseErrors({ ...requestUpdateErrors, ...requestUpdateMessage }));
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

  if (initialLoading) {
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );
  }

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
              <Input {...register(`imo`)} label="IMO" disabled customStyles="w-full" />
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
                asyncCall={loading}
                disabled={!ports.length}
                name="portOfRegistry"
                onChange={(option) => handleChange('portOfRegistry', option)}
              />
              <FormDropdown
                label="Country"
                options={countries}
                name="country"
                asyncCall={loading}
                disabled={!countries.length}
                onChange={(option) => handleChange('country', option)}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown
                label="Tanker type"
                options={tankerType.options}
                asyncCall={loading}
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
                asyncCall={loading}
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
                asyncCall={loading}
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
                asyncCall={loading}
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
                asyncCall={loading}
                disabled={!countries.length || !watch('disponentOwner')}
                name="disponentOwnerCountry"
                onChange={(option) => handleChange('disponentOwnerCountry', option)}
              />
            </div>
            <div>
              <Title level={4} className="mb-2.5">
                Upload your Q88 questionnaire file
              </Title>
              <DropzoneForm showTextFields={false} />
            </div>
          </div>
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

UpdateTankerForm.propTypes = UpdateTankerFormPropTypes;

export default UpdateTankerForm;
