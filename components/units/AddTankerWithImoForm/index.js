'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { AddTankerWithImoFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, TextWithLabel } from '@/elements';
import { tankersSchema } from '@/lib/schemas';
import { getQ88DataByImo } from '@/services/vessel';
import { ModalHeader } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...tankersSchema(),
});

const AddTankerWithImoForm = ({ closeModal, handleNextStep, fleetData, setQ88 }) => {
  const methods = useHookFormParams({ schema });
  const { name: fleetName } = fleetData;
  const onSubmit = async (formData) => {
    const { data } = await getQ88DataByImo({ imo: formData.imo });
    setQ88({ ...data, imo: formData.imo });
    handleNextStep();
    // const { status, error } = await addVesselByImo({ data: formData, fleetId: id });
    // if (status === 200) return;
    // if (error) {
    //   setImo(formData.imo);
    //   handleNextStep();
    // }
  };

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
          <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start [&>p]:!ml-0  mt-5" />
          <p className="text-xsm my-4">
            Enter the IMO of the tanker, if it is in our Q88 database, then we will add it automatically, if not, then
            you will need to add it manually.
          </p>
          <Input
            {...methods.register('imo')}
            label="IMO"
            placeholder="9581291"
            error={methods.formState.errors?.imo?.message}
          />
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerWithImoForm.propTypes = AddTankerWithImoFormPropTypes;

export default AddTankerWithImoForm;
