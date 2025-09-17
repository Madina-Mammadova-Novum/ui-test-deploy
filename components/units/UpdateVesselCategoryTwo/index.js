'use client';

import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { UpdateVesselCategoryTwoPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { FormDropdown, Loader, TextWithLabel, Title } from '@/elements';
import { getVesselCategoryTwo, updateVesselTankerLink } from '@/services/vessel';
import { updateVesselCategoryTwo } from '@/store/entities/fleets/slice';
import { convertDataToOptions } from '@/utils/helpers';
import { errorToast, successToast, useFetch, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  vesselCategoryTwo: yup.object().required('Vessel category two is required'),
});

const UpdateVesselCategoryTwo = ({
  vesselId,
  tankerName,
  vesselCategoryOneId,
  vesselTypeId,
  closeModal,
  currentValue,
}) => {
  const [data, isLoading] = useFetch(
    useCallback(() => getVesselCategoryTwo(vesselCategoryOneId), [vesselCategoryOneId])
  );
  const methods = useHookFormParams({
    schema,
    state: {
      vesselCategoryTwo: currentValue ? { value: currentValue.id, label: currentValue.name } : null,
    },
  });
  const { setValue, getValues } = methods;
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;
    setValue(key, value);
  };

  const handleSubmit = async ({ vesselCategoryTwo }) => {
    try {
      const requestData = {
        vesselTypeId,
        vesselCategoryOneId,
        vesselCategoryTwoId: vesselCategoryTwo.value,
      };

      const { error, message } = await updateVesselTankerLink({ vesselId, data: requestData });

      if (error) {
        errorToast(error?.title || 'Error', error?.message || 'Failed to update vessel category');
      } else {
        // Update Redux store with the new vessel category two name
        dispatch(
          updateVesselCategoryTwo({
            vesselId,
            vesselCategoryTwoName: vesselCategoryTwo.label,
          })
        );

        successToast(message || 'Vessel category updated successfully');
        closeModal();
      }
    } catch (error) {
      errorToast('Error', 'Failed to update vessel category');
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex h-72 w-72 items-center justify-center">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  const categoryTwoOptions = convertDataToOptions({ data }, 'id', 'name');

  return (
    <div className="w-[292px]">
      <FormProvider {...methods}>
        <ModalFormManager
          submitButton={{
            text: 'Apply changes',
            variant: 'primary',
            size: 'large',
          }}
          submitAction={handleSubmit}
          onClose={closeModal}
          specialStyle
        >
          <Title level={2}>Update Vessel Category</Title>
          <TextWithLabel label="Tanker name" text={tankerName} customStyles="!flex-col !items-start [&>p]:!ml-0" />
          <FormDropdown
            name="vesselCategoryTwo"
            label="Dirty/Clean Category"
            labelBadge="*"
            options={categoryTwoOptions}
            customStyles={{ dropdownExpanded: true }}
            onChange={(option) => handleChange('vesselCategoryTwo', option)}
          />
        </ModalFormManager>
      </FormProvider>
    </div>
  );
};

UpdateVesselCategoryTwo.propTypes = UpdateVesselCategoryTwoPropTypes;

export default UpdateVesselCategoryTwo;
