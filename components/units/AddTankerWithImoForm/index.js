'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { AddTankerWithImoFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { FormDropdown, Input } from '@/elements';
import { q88ImoCheckSchema } from '@/lib/schemas';
import { getQ88DataByImo } from '@/services/vessel';
import { ModalHeader } from '@/units';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const AddTankerWithImoForm = ({
  closeModal,
  handleNextStep,
  fleetOptions,
  setQ88,
  setSelectedFleet,
  selectedFleet,
}) => {
  const schema = yup.object({ ...q88ImoCheckSchema() });

  const methods = useHookFormParams({ schema, state: { fleet: selectedFleet, imo: '' } });

  const { setValue, getValues } = methods;

  const handleChange = (key, value) => {
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;
    setValue(key, value);
    setSelectedFleet(value);
  };

  const onSubmit = async (formData) => {
    const { data, error, status } = await getQ88DataByImo({ imo: formData.imo });
    if (status === 200 || status === 404) {
      setQ88({ ...data, imo: formData.imo });
      handleNextStep();
    } else {
      errorToast(error.title, error.message);
    }
  };

  const handleOnChange = ({ target }) => {
    const modifiedValue = target.value.replace(/\D/g, '');
    methods.setValue('imo', modifiedValue);
  };

  const imoValue = methods.watch('imo');

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Add tanker', variant: 'primary', size: 'large' }}
        specialStyle
      >
        <div className="w-[296px]">
          <ModalHeader>Add a New Tanker</ModalHeader>
          <FormDropdown
            label="Fleet name"
            options={fleetOptions}
            name="fleet"
            onChange={(fleet) => handleChange('fleet', fleet)}
            customStyles={{ dropdownExpanded: true }}
          />
          <p className="text-xsm my-4">
            Enter the IMO of the tanker, if it is in our Q88 database, then we will add it automatically, if not, then
            you will need to add it manually.
          </p>
          <Input
            label="IMO"
            value={imoValue}
            onChange={handleOnChange}
            placeholder="Enter IMO"
            error={methods.formState.errors?.imo?.message}
          />
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerWithImoForm.propTypes = AddTankerWithImoFormPropTypes;

export default AddTankerWithImoForm;
