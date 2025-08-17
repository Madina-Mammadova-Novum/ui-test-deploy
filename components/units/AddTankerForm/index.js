'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ModalFormManager } from '@/common';
import { FormDropdown, Input } from '@/elements';
import { addTankerSchema } from '@/lib/schemas';
import { addVessel } from '@/services/vessel';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { ModalHeader, Q88FileUpload } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const AddTankerForm = ({ closeModal, fleetOptions, selectedFleet, setSelectedFleet, onMoveToManualForm }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = yup.object({ ...addTankerSchema() });

  const methods = useHookFormParams({
    schema,
    state: {
      fleet: selectedFleet,
      imo: '',
      file: '',
    },
  });

  const { setValue, getValues, watch } = methods;

  const handleChange = (key, value) => {
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;
    setValue(key, value);
    // Clear errors when value changes
    if (methods.formState.errors[key]) {
      methods.clearErrors(key);
    }
    if (key === 'fleet') {
      setSelectedFleet(value);
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const { status, message, messageDescription, error, data } = await addVessel({
        imo: formData.imo,
        fleetId: formData.fleet.value,
        q88QuestionnaireFile: formData.file, // The file URL comes from the form's file field
      });

      if (status >= 200 && status < 400) {
        const { body } = data || {};
        const { automaticParsingEnabled, id } = body || {};

        if (automaticParsingEnabled) {
          // Automatic parsing successful - complete the flow
          dispatch(refetchFleets());
          successToast(message, messageDescription);
          closeModal();
        } else if (onMoveToManualForm) {
          // Automatic parsing failed - move to manual form
          onMoveToManualForm({
            imo: formData.imo,
            fleet: formData.fleet,
            file: formData.file,
            vesselId: id,
          });
        }
      } else if (error) {
        errorToast(error?.title, error?.message);
      }
    } catch (err) {
      errorToast('Error', 'Failed to add tanker. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChange = ({ target }) => {
    const modifiedValue = target.value.replace(/\D/g, '');
    methods.setValue('imo', modifiedValue);
    // Clear IMO errors when value changes
    if (methods.formState.errors.imo) {
      methods.clearErrors('imo');
    }
  };

  const imoValue = watch('imo');

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{
          text: isSubmitting ? 'Adding tanker...' : 'Add tanker',
          variant: 'primary',
          size: 'large',
          disabled: isSubmitting,
        }}
        specialStyle
      >
        <div className="w-[480px]">
          <ModalHeader>Add a New Tanker</ModalHeader>

          <FormDropdown
            label="Fleet name"
            options={fleetOptions}
            name="fleet"
            onChange={(fleet) => handleChange('fleet', fleet)}
            customStyles={{ dropdownExpanded: true }}
          />

          <div className="my-4">
            <Input
              label="IMO"
              labelBadge="*"
              value={imoValue}
              onChange={handleOnChange}
              placeholder="Enter IMO"
              error={methods.formState.errors?.imo?.message}
              maxLength={7}
            />
          </div>

          <div className="mb-4">
            <Q88FileUpload
              setValue={setValue}
              clearErrors={methods.clearErrors}
              setError={methods.setError}
              watch={watch}
              error={methods.formState.errors?.file?.message}
              disabled={isSubmitting}
              name="file"
            />
          </div>
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

AddTankerForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fleetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFleet: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedFleet: PropTypes.func.isRequired,
  onMoveToManualForm: PropTypes.func,
};

export default AddTankerForm;
