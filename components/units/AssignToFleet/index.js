'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { AssignToFleetPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { FormDropdown, Loader, TextWithLabel, Title } from '@/elements';
import { assignToFleetSchema } from '@/lib/schemas';
import { getUserFleets } from '@/services';
import { addVesselToFleet } from '@/services/vessel';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { convertDataToOptions } from '@/utils/helpers';
import { useFetch, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...assignToFleetSchema(),
});

const AssignToFleet = ({ tankerId, name, closeModal }) => {
  const [data, isLoading] = useFetch(getUserFleets);
  const methods = useHookFormParams({ schema });
  const { setValue, getValues } = methods;
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;
    setValue(key, value);
  };

  const handleSubmit = async ({ fleet }) => {
    const { status } = await addVesselToFleet({ data: { tankerId }, fleetId: fleet.value });
    if (status === 200) {
      dispatch(refetchFleets());
      closeModal();
    }
  };

  if (isLoading) {
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );
  }

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
          <Title level={2}>Edit Assigned Fleet</Title>
          <TextWithLabel label="Tanker name" text={name} customStyles="!flex-col !items-start [&>p]:!ml-0" />
          <FormDropdown
            name="fleet"
            label="Fleet name"
            options={convertDataToOptions({ data }, 'id', 'name')}
            customStyles={{ dropdownExpanded: true }}
            onChange={(option) => handleChange('fleet', option)}
          />
        </ModalFormManager>
      </FormProvider>
    </div>
  );
};

AssignToFleet.propTypes = AssignToFleetPropTypes;

export default AssignToFleet;
