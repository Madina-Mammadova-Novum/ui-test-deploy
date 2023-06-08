'use client';

import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import * as yup from 'yup';

import { AddTankerManuallyFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Button, DatePicker, FormDropdown, Input, TextWithLabel, Title } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
import { ModalHeader } from '@/units';
import Dropzone from '@/units/FileUpload/Dropzone';
import { getValueWithPath, updateFormats } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';
import { tankerDataSchema } from '@/lib/schemas';

const schema = yup.object({
  ...tankerDataSchema()
});

const AddTankerManuallyForm = ({ closeModal, goBack }) => {
  const methods = useHookFormParams({ schema });
  const onSubmit = async (formData) => console.log(formData);
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

  const {
    register,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  }

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

  const testOption = [
    { label: 'testLabel', value: 'testValue' },
    { label: 'testLabel2', value: 'testValue2' },
  ];

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Add tanker', variant: 'primary', size: 'large' }}
      >
        <div className="w-[756px]">
          <ModalHeader goBack={goBack}>Add a New Tanker</ModalHeader>
          <TextWithLabel
            label="Fleet name"
            text="Fleet Base West"
            customStyles="!flex-col !items-start [&>p]:!ml-0 mt-5"
          />

          <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-[12px] my-5">
            <p>
              Unfortunately, the IMO of the Tanker you specified <b>9581291</b> was not found in our system, please add
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
              <Input 
                {...register(`imo`)} 
                label="IMO" 
                disabled 
                value="9581291" 
                customStyles="w-full" 
              />
              <DatePicker 
                label="Last Q88 update date" 
                name="updateDate" 
                onChange={(date) => handleChange('updateDate', date)}
                error={errors.updateDate?.message}
              />
              <FormDropdown
                label="Built"
                name="built"
                options={testOption}
                customStyles={{ className: 'grid self-end' }}
                onChange={(option) => handleChange('built', option)}
              />
              <FormDropdown label="Port of registry" options={testOption} name="portOfRegistry" onChange={(option) => handleChange('portOfRegistry', option)} />
              <FormDropdown label="Country" options={testOption} name="country" onChange={(option) => handleChange('country', option)} />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <FormDropdown label="Tanker type" options={testOption} name="tankerType" onChange={(option) => handleChange('tankerType', option)} />
              <FormDropdown label="Tanker category #1" options={testOption} name="tankerCategory_1" onChange={(option) => handleChange('tankerCategory_1', option)} />
              <FormDropdown label="Tanker category #2" options={testOption} name="tankerCategory_2" onChange={(option) => handleChange('tankerCategory_2', option)} />
              <FormDropdown
                label="Hull type"
                options={testOption}
                name="hullType"
                onChange={(option) => handleChange('hullType', option)}
                customStyles={{ className: 'col-span-2' }}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-start">
              <Input 
                {...register(`loa`)} 
                label="LOA" 
                customStyles="w-full" 
                error={errors.loa?.message}
              />
              <Input 
                {...register(`beam`)} 
                label="Beam" 
                customStyles="w-full" 
                error={errors.beam?.message}
              />
              <Input 
                {...register(`summerDWT`)} 
                label="Summer DWT" 
                customStyles="w-full"
                error={errors.summerDWT?.message}
              />
              <Input 
                {...register(`summmerDraft`)} 
                label="Summer draft" 
                customStyles="w-full"
                error={errors.summmerDraft?.message}
              />
              <Input 
                {...register(`normalBallastWDT`)} 
                label="Normal ballast WDT" 
                customStyles="w-full"
                error={errors.normalBallastWDT?.message}
              />
              <Input 
                {...register(`normalBallastDraft`)} 
                label="Normal ballast draft" 
                customStyles="w-full"
                error={errors.normalBallastDraft?.message}
              />
              <Input 
                {...register(`cubicCapacity`)} 
                label="cubic capacity 98%" 
                customStyles="w-full"
                error={errors.cubicCapacity?.message}
              />
              <FormDropdown label="IMO class" options={testOption} name="imoClass" onChange={(option) => handleChange('imoClass', option)} />
              <FormDropdown
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                options={testOption}
                name="grades"
                onChange={(option) => handleChange('grades', option)}
                customStyles={{ className: 'col-span-4' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 items-start">
              <Input 
                {...register(`registeredOwner`)} 
                label="Registered owner" 
                customStyles="w-full" 
                error={errors.registeredOwner?.message}
              />
              <FormDropdown label="Country" options={testOption} name="registeredOwnerCountry" onChange={(option) => handleChange('registeredOwnerCountry', option)} />
              <Input 
                {...register(`technicalOperator`)} 
                label="Technical operator" 
                customStyles="w-full"
                error={errors.technicalOperator?.message}
              />
              <FormDropdown label="Country" options={testOption} name="technicalOperatorCountry" onChange={(option) => handleChange('technicalOperatorCountry', option)} />
              <Input 
                {...register(`commercialOperator`)} 
                label="Commercial operator" 
                customStyles="w-full" 
                error={errors.commercialOperator?.message}
              />
              <FormDropdown label="Country" options={testOption} name="commercialOperatorCountry" onChange={(option) => handleChange('commercialOperatorCountry', option)} />
              <Input 
                {...register(`disponentOwner`)} 
                label="Disponent owner" 
                customStyles="w-full"
                error={errors.disponentOwner?.message}
              />
              <FormDropdown label="Country" options={testOption} name="disponentOwnerCountry" onChange={(option) => handleChange('disponentOwnerCountry', option)} />
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
