'use client';

import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { UpdateTankerFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { DatePicker, Dropdown, Input, TextWithLabel, Title } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
import { ModalHeader } from '@/units';
import Dropzone from '@/units/FileUpload/Dropzone';
import { updateFormats } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const UpdateTankerForm = ({ closeModal }) => {
  const methods = useHookFormParams({ schema: {} });
  const onSubmit = async (formData) => {
    return {
      result: {
        formData,
      },
    };
  };
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

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
        submitButton={{ text: 'Request to Update Info', variant: 'primary', size: 'large' }}
      >
        <div className="w-[756px]">
          <ModalHeader>Request to Update Info</ModalHeader>
          <TextWithLabel
            label="Fleet name"
            text="Fleet Base West"
            customStyles="!flex-col !items-start [&>p]:!ml-0 mt-5"
          />

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
              <Input label="Tanker name" customStyles="w-full" />
              <Input label="IMO" disabled value="9581291" customStyles="w-full" />
              <DatePicker label="Last Q88 update date" onChange={() => {}} />
              <Dropdown
                label="Built"
                options={testOption}
                customStyles={{ className: 'grid self-end' }}
                onChange={() => {}}
              />
              <Dropdown label="Port of registry" options={testOption} onChange={() => {}} />
              <Dropdown label="Country" options={testOption} onChange={() => {}} />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
              <Dropdown label="Tanker type" options={testOption} onChange={() => {}} />
              <Dropdown label="Tanker category #1" options={testOption} onChange={() => {}} />
              <Dropdown label="Tanker category #2" options={testOption} onChange={() => {}} />
              <Dropdown
                label="Hull type"
                options={testOption}
                onChange={() => {}}
                customStyles={{ className: 'col-span-2' }}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-4">
              <Input label="LOA" customStyles="w-full" />
              <Input label="Beam" customStyles="w-full" />
              <Input label="Summer DWT" customStyles="w-full" />
              <Input label="Summer draft" customStyles="w-full" />
              <Input label="Normal ballast WDT" customStyles="w-full" />
              <Input label="Normal ballast draft" customStyles="w-full" />
              <Input label="cubic capacity 98%" customStyles="w-full" />
              <Input label="IMO class" customStyles="w-full" />
              <Dropdown
                label="How many grades / products can tanker load / discharge with double valve segregation?"
                options={testOption}
                onChange={() => {}}
                customStyles={{ className: 'col-span-4' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 items-end">
              <Input label="Registered owner" customStyles="w-full" />
              <Dropdown label="Country" options={testOption} onChange={() => {}} />
              <Input label="Technical operator" customStyles="w-full" />
              <Dropdown label="Country" options={testOption} onChange={() => {}} />
              <Input label="Commercial operator" customStyles="w-full" />
              <Dropdown label="Country" options={testOption} onChange={() => {}} />
              <Input label="Disponent owner" customStyles="w-full" />
              <Dropdown label="Country" options={testOption} onChange={() => {}} />
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
