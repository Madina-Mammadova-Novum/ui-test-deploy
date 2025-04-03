'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FavoriteSearchFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { CheckBoxInput, Input, Title } from '@/elements';
import { addToSavedSearchSchema } from '@/lib/schemas';
import { addToSavedSearch } from '@/services/savedSearch';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...addToSavedSearchSchema(),
});

const FavoriteSearchForm = ({
  state,
  title,
  message = 'Would you like to receive notifications related to this favorite search?',
  closeModal,
}) => {
  const methods = useHookFormParams({ schema });

  const { setValue, getValues } = methods;

  const onSubmit = async ({ searchName, isNotification }) => {
    const data = { ...state, searchName, isNotification: isNotification || false };

    const { status, error, message: successMessage } = await addToSavedSearch({ data });
    if (!error) closeModal();

    if (status === 200) {
      successToast(successMessage);
      closeModal();
    }
    if (error) errorToast(error?.title, error?.message);
  };

  const handleIsNotification = (event) => {
    const { checked } = event.target;
    setValue('isNotification', checked, { shouldValidate: true });
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        specialStyle
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Add', variant: 'primary', size: 'large', disabled: methods.formState.isSubmitting }}
        onClose={closeModal}
      >
        <Title level="2" className="text-lg font-bold capitalize text-black">
          {title}
        </Title>
        <Input
          {...methods.register('searchName')}
          error={methods.formState.errors?.searchName?.message}
          label="search name"
          labelBadge="*"
          placeholder="Enter name of the search"
          customStyles="w-full"
        />

        <CheckBoxInput
          name="isNotification"
          onChange={handleIsNotification}
          checked={getValues('isNotification')}
          labelStyles="text-black text-xsm"
        >
          {message}
        </CheckBoxInput>
      </ModalFormManager>
    </FormProvider>
  );
};

FavoriteSearchForm.propTypes = FavoriteSearchFormPropTypes;

export default FavoriteSearchForm;
