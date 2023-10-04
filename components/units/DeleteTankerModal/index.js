'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteTankerModalPropTypes } from '@/lib/types';

import { Button, TextWithLabel, Title } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { removeVessel, removeVesselFromFleet } from '@/services/vessel';
import { fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { deleteVesselFromFleetsState, deleteVesselFromUnassignedFleetsState } from '@/store/entities/fleets/slice';
import { successToast } from '@/utils/hooks';

const DeleteTankerModal = ({ closeModal, state }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, fleetId, name, action } = state;
  const isRemoveFromFleet = ACTIONS.DELETE_TANKER_FROM_FLEET === action;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    switch (action) {
      case ACTIONS.DELETE_TANKER_FROM_FLEET: {
        const { error, message: successMessage } = await removeVesselFromFleet({ id });
        if (error) {
          return console.log(error);
        }
        dispatch(fetchUnassignedFleetData());
        dispatch(deleteVesselFromFleetsState({ tankerId: id, fleetId }));
        successToast(successMessage);
        closeModal();

        break;
      }
      case ACTIONS.DELETE_TANKER: {
        const { error, message: successMessage } = await removeVessel({ id });
        if (error) {
          return console.log(error);
        }
        dispatch(deleteVesselFromUnassignedFleetsState(id));
        successToast(successMessage);
        closeModal();

        break;
      }
      default: {
        break;
      }
    }
    return setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-y-4 max-w-[292px]">
      <Title level="2">{isRemoveFromFleet ? 'Remove' : 'Delete'} Tanker</Title>
      <TextWithLabel label="Tanker name" text={name} customStyles="!flex-col !items-start [&>p]:!ml-0" />
      {isRemoveFromFleet ? (
        <p className="text-xsm">
          Are you sure you want to remove this tanker from the fleet?
          <b> After removal you can find this tanker under Unassigned Fleet.</b>
        </p>
      ) : (
        <p className="text-xsm">
          Are you sure you want to delete this tanker with all data?
          <b> To restore the tanker information you will need to follow the addition process again</b>
        </p>
      )}
      <div className="flex gap-x-2.5">
        <Button
          buttonProps={{
            text: 'Cancel',
            variant: 'tertiary',
            size: 'large',
          }}
          onClick={closeModal}
          customStylesFromWrap="w-1/2"
          customStyles="w-full"
        />
        <Button
          buttonProps={{
            text: isSubmitting ? 'Please wait...' : `${isRemoveFromFleet ? 'Remove' : 'Delete'} tanker`,
            variant: 'delete',
            size: 'large',
          }}
          disabled={isSubmitting}
          customStylesFromWrap="w-1/2"
          customStyles="w-full whitespace-nowrap"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

DeleteTankerModal.propTypes = DeleteTankerModalPropTypes;

export default DeleteTankerModal;
