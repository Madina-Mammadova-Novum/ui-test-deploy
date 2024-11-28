'use client';

/* eslint-disable prefer-destructuring */

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import debounce from 'lodash/debounce';
import * as yup from 'yup';

import { UpdateTankerFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { ModalFormManager } from '@/common';
import { Button, DatePicker, FormDropdown, Input, Loader, TextWithLabel, Title } from '@/elements';
import { unassignedFleetOption } from '@/lib/constants';
import { fileSchema, tankerDataSchema } from '@/lib/schemas';
import DropzoneForm from '@/modules/DropzoneForm';
import { getPorts } from '@/services';
import { getVesselCategoryOne, getVesselCategoryTwo, requestUpdateVessel } from '@/services/vessel';
import { fetchPrefilledDataToUpdate } from '@/store/entities/fleets/actions';
import { clearPrefilledState, refetchFleets } from '@/store/entities/fleets/slice';
import { fleetsSelector } from '@/store/selectors';
import { ModalHeader } from '@/units';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { hullTypeOptions, imoClassOptions } from '@/utils/mock';

const UpdateTankerForm = ({ closeModal, fleetData = unassignedFleetOption, itemId, isValid }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [portsLoading, setPortsLoading] = useState(false);
  const [ports, setPorts] = useState(false);
  const [perList, setPerList] = useState(50);

  const {
    prefilledUpdateVesselState: { loading, data: prefilledData, countries, tankerTypes },
  } = useSelector(fleetsSelector);

  const [valid, setValid] = useState(isValid || false);

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
    ...fileSchema(true),
  });

  const { tankerType, tankerCategoryOne, tankerCategoryTwo } = tankerOptions;
  const { label: fleetName } = fleetData;

  const methods = useHookFormParams({ schema });

  const dispatch = useDispatch();

  const {
    reset,
    watch,
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
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

  const getValidOptions = (data, value) => {
    const filteredOption = data?.filter((option) => option?.id === value);
    const options = convertDataToOptions({ data: filteredOption }, 'id', 'name')[0];

    return options;
  };

  const fetchDataOptions = async () => {
    const validPrefilledOptions = {};

    if (prefilledData?.tankerCategoryOne?.value) {
      const { data: categoryOne } = await getVesselCategoryOne(prefilledData.tankerType.value);
      const options = getValidOptions(categoryOne, prefilledData.tankerCategoryOne.value);

      validPrefilledOptions.tankerCategoryOne = options;
    }

    if (prefilledData?.tankerCategoryTwo?.value) {
      const { data: categoryTwo } = await getVesselCategoryTwo(prefilledData.tankerCategoryOne.value);
      const options = getValidOptions(categoryTwo, prefilledData.tankerCategoryTwo.value);
      validPrefilledOptions.tankerCategoryTwo = options;
    }

    setInitialLoading(false);
    reset({ ...prefilledData, ...validPrefilledOptions });
    handleTankerOptionsChange('tankerType', { options: tankerTypes });
  };

  const onSubmit = async (formData) => {
    const { status, message, messageDescription, error } = await requestUpdateVessel({
      data: { ...formData, tankerId: itemId },
    });

    if (status === 200) {
      successToast(message, messageDescription);
      dispatch(refetchFleets());
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

  useEffect(() => {
    if (!loading) {
      fetchDataOptions();
    }
  }, [loading]);

  useEffect(() => {
    getPortsData();
  }, [perList]);

  useEffect(() => {
    dispatch(fetchPrefilledDataToUpdate(itemId));
    return () => dispatch(clearPrefilledState());
  }, []);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

  if (initialLoading) {
    return (
      <div className="h-72 w-72">
        <Loader className="absolute top-1/2 h-8 w-8" />
      </div>
    );
  }

  if (!valid) {
    return (
      <div>
        <Title level="2">Your previous request has not yet been reviewed by the admin.</Title>
        <p className="pt-2.5 text-black">Would you like to make any new changes?</p>
        <div className="flex w-full gap-x-5 pt-5">
          <Button
            customStyles="w-full"
            customStylesFromWrap="flex-1"
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
            onClick={closeModal}
          />
          <Button
            customStyles="w-full"
            customStylesFromWrap="flex-1"
            buttonProps={{ text: 'Submit', variant: 'primary', size: 'large' }}
            onClick={() => setValid(true)}
          />
        </div>
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
        <div className="w-[640px] overflow-clip 3md:w-[756px]">
          <ModalHeader>Request to Update Info</ModalHeader>
          <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start !gap-2.5 mt-5" />

          <div className="relative mt-2.5 rounded-md border border-gray-darker bg-gray-light px-5 py-2.5 text-xs-sm">
            <Title level="4">Please note!</Title>
            <p className="py-2.5 text-xs-sm">
              You can edit all the fields if the information is incorrect, but for this you will need to send a request
              to change the data, which can be reviewed up to 24 hours, and after confirmation your data will be updated
              automatically.
            </p>
          </div>

          <div className="mt-5 grid h-80 grid-cols-1 gap-y-4 overflow-scroll pr-2.5 3md:h-[26.25rem]">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Input
                {...register(`tankerName`)}
                label="Tanker name"
                customStyles="w-full"
                error={errors.tankerName?.message}
              />
              <Input {...register(`imo`)} label="IMO" disabled customStyles="w-full" maxLength={7} />
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
                disabled={watch('built')}
                inputStyles="bg-[#E7ECF8]"
                customStyles="w-full"
                error={errors.built?.message}
              />
              <FormDropdown
                label="Port of registry"
                options={ports}
                loading={portsLoading}
                loadOptions={loadOptions}
                onMenuScrollToBottom={handleMore}
                asyncCall
                disabled={initialLoading}
                name="portOfRegistry"
                onChange={(option) => handleChange('portOfRegistry', option)}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown
                label="Tanker type"
                options={tankerType.options}
                loading={loading}
                asyncCall
                disabled={!tankerType.options.length || watch('tankerType.value')}
                name="tankerType"
                onChange={(option) => handleChange('tankerType', option)}
              />
              <FormDropdown
                label="Tanker category #1"
                options={tankerCategoryOne.options}
                loading={tankerCategoryOne.loading}
                asyncCall
                disabled={!tankerCategoryOne.options.length || watch('tankerCategoryOne.value')}
                name="tankerCategoryOne"
                onChange={(option) => handleChange('tankerCategoryOne', option)}
              />
              <FormDropdown
                label="Tanker category #2"
                options={tankerCategoryTwo.options}
                loading={tankerCategoryTwo.loading}
                asyncCall
                disabled={!tankerCategoryTwo.options.length || watch('tankerCategoryTwo.value')}
                name="tankerCategoryTwo"
                onChange={(option) => handleChange('tankerCategoryTwo', option)}
              />
              <FormDropdown
                label="Hull type"
                options={hullTypeOptions}
                name="hullType"
                disabled={!hullTypeOptions.length || watch('hullType.value')}
                onChange={(option) => handleChange('hullType', option)}
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
                disabled={watch('loa')}
                placeholder="meters"
                error={errors.loa?.message}
              />
              <Input
                {...register(`beam`)}
                label="Beam"
                disabled={watch('beam')}
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.beam?.message}
              />
              <Input
                {...register(`summerDWT`)}
                disabled={watch('summerDWT')}
                label="Summer DWT"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="tons"
                error={errors.summerDWT?.message}
              />
              <Input
                {...register(`summerDraft`)}
                disabled={watch('summerDraft')}
                label="Summer draft"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.summerDraft?.message}
              />
              <Input
                {...register(`normalBallastDWT`)}
                disabled={watch('normalBallastDWT')}
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
                disabled={watch('normalBallastDraft')}
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="meters"
                error={errors.normalBallastDraft?.message}
              />
              <Input
                {...register(`cubicCapacity`)}
                disabled={watch('cubicCapacity')}
                label="cubic capacity 98%"
                customStyles="w-full"
                type="number"
                step="any"
                placeholder="M"
                error={errors.cubicCapacity?.message}
              />
              <FormDropdown
                label="IMO class"
                disabled={watch('imoClass')}
                options={imoClassOptions}
                name="imoClass"
                onChange={(option) => handleChange('imoClass', option)}
              />
              <Input
                {...register(`grades`)}
                disabled={watch('grades')}
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                type="number"
                customStyles="col-span-4"
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
                loading={loading}
                asyncCall
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
                loading={loading}
                asyncCall
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
                loading={loading}
                asyncCall
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
                loading={loading}
                asyncCall
                disabled={!countries.length || !watch('disponentOwner')}
                name="disponentOwnerCountry"
                onChange={(option) => handleChange('disponentOwnerCountry', option)}
              />
            </div>
            <div>
              <Title level="4" className="mb-2.5">
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
