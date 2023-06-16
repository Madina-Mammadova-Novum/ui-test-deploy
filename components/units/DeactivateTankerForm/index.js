'use client';

import { FormProvider } from 'react-hook-form';

import { DeactivateTankerFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Label, Title } from '@/elements';
import { useHookFormParams } from '@/utils/hooks';

const DeactivateTankerForm = ({ title, description, portName, closeModal }) => {
  const methods = useHookFormParams({});

  const onSubmit = async () => {
    return { deactivateUserTanker: true };
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Deactivate tanker', variant: 'delete', size: 'large', disabled: false }}
        onClose={closeModal}
        specialStyle
      >
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <div>
          <Label className="text-xs-sm">Tanker name</Label>
          <p className="font-semibold text-black text-xsm">{portName}</p>
        </div>
        <p className="text-black text-xsm">{description}</p>
      </ModalFormManager>
    </FormProvider>
  );
};

DeactivateTankerForm.propTypes = DeactivateTankerFormPropTypes;

export default DeactivateTankerForm;
