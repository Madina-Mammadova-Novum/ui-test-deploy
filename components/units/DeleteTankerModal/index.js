'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteTankerModalPropTypes } from '@/lib/types';

import { Button, TextWithLabel, Title } from '@/elements';
import { removeVessel } from '@/services/vessel';
import { deleteVesselFromFleetsState, deleteVesselFromUnassignedFleetsState } from '@/store/entities/fleets/slice';
import { ConfirmModal } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const DeleteTankerModal = ({ closeModal, state }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { id, name, fleetId } = state;

  const handleDelete = async () => {
    setIsSubmitting(true);
    const { error, message } = await removeVessel({ id });

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      if (fleetId) {
        dispatch(deleteVesselFromFleetsState({ tankerId: id, fleetId }));
      } else {
        dispatch(deleteVesselFromUnassignedFleetsState(id));
      }
      successToast(message);
    }

    closeModal();
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmModalOpen(false);
    handleDelete();
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex max-w-[292px] flex-col gap-y-4">
        <Title level="2">Delete Tanker</Title>
        <TextWithLabel label="Tanker name" text={name} customStyles="!flex-col !items-start [&>p]:!ml-0" />

        <p className="text-xsm">
          Are you sure you want to delete this tanker with all data?
          <b> To restore the tanker information you will need to follow the addition process again</b>
        </p>

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
              text: 'Delete tanker',
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseConfirmModal}
        title="Confirm Deletion"
        message={`This action cannot be undone. Are you absolutely sure you want to permanently delete "${name}"?`}
        confirmText={isSubmitting ? 'Deleting...' : 'Yes, Delete'}
        cancelText="Cancel"
        variant="delete"
        okButtonProps={{
          disabled: isSubmitting,
        }}
        cancelButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </>
  );
};

DeleteTankerModal.propTypes = DeleteTankerModalPropTypes;

export default DeleteTankerModal;
