'use client';

import { useEffect, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { EditFleetFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { editFleetSchema } from '@/lib/schemas';
import { editFleet } from '@/services/fleets';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { getFleetsSelector } from '@/store/selectors';
import { successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...editFleetSchema(),
});

const EditFleetForm = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  const { data: fleetsData } = useSelector(getFleetsSelector);

  // Find the fleet by id and get its name for default value
  const defaultValues = useMemo(() => {
    const fleet = fleetsData?.find((item) => item.id === id);
    return { fleetName: fleet?.name || '' };
  }, [fleetsData, id]);

  const methods = useHookFormParams({ schema, state: defaultValues });

  // Reset form with default values when they change
  useEffect(() => {
    if (defaultValues.fleetName) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);
  const onSubmit = async (formData) => {
    const { status, message, error } = await editFleet({ data: formData, fleetId: id });

    if (status === 200) {
      dispatch(refetchFleets());
      successToast(message);
      closeModal();
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Save changes', variant: 'primary', size: 'large' }}
      >
        <Title level="2">Edit Fleet</Title>
        <Input
          {...methods.register('fleetName')}
          label="Fleet name"
          placeholder="Enter name of the fleet"
          labelBadge="*"
          error={methods.formState.errors?.fleetName?.message}
        />
      </ModalFormManager>
    </FormProvider>
  );
};

EditFleetForm.propTypes = EditFleetFormPropTypes;

export default EditFleetForm;
