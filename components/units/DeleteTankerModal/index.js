'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteTankerModalPropTypes } from '@/lib/types';

import { Button, TextWithLabel, Title } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { removeVessel, removeVesselFromFleet } from '@/services/vessel';
import {
  deleteVesselFromFleetsState,
  deleteVesselFromUnassignedFleetsState,
  refetchFleets,
} from '@/store/entities/fleets/slice';
import { errorToast, successToast } from '@/utils/hooks';

const DeleteTankerModal = ({ closeModal, state }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, fleetId, name, action, fleetName } = state;

  const isRemoveFromFleet = ACTIONS.DELETE_TANKER_FROM_FLEET === action;

  const handleRemoveFleet = async () => {
    setIsSubmitting(true);
    const { error, message } = await removeVesselFromFleet({ id, fleetName });

    dispatch(deleteVesselFromFleetsState({ tankerId: id, fleetId }));
    successToast(message);
    closeModal();

    if (error) errorToast(error?.title, error?.message);

    dispatch(refetchFleets());
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    const { error, message } = await removeVessel({ id });

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      dispatch(deleteVesselFromUnassignedFleetsState(id));
      successToast(message);
    }
    closeModal();
    setIsSubmitting(false);
  };

  const HANDLERS = {
    DELETE_TANKER: handleDelete,
    DELETE_TANKER_FROM_FLEET: handleRemoveFleet,
  };

  const handleSubmit = () => HANDLERS[action]();

  return (
    <div className="flex max-w-[292px] flex-col gap-y-4">
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
