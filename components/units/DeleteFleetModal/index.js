'use client';

import { useDispatch } from 'react-redux';

import { DeleteFleetModalPropTypes } from '@/lib/types';

import { Button, TextWithLabel, Title } from '@/elements';
import { deleteFleet } from '@/services/fleets';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { successToast } from '@/utils/hooks';

const DeleteFleetModal = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  const handleDeleteFleet = async () => {
    const { status, message, error } = await deleteFleet({ fleetId: id });

    if (status === 204) {
      dispatch(refetchFleets());
      successToast(message);
      closeModal();
    }

    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 max-w-[292px]">
      <Title level="2">Delete Fleet</Title>
      <TextWithLabel label="Fleet name" text="Fleet Base West" customStyles="!flex-col !items-start [&>p]:!ml-0" />
      <p className="text-xsm">
        Are you sure you want to delete this fleet with all data?
        <b> To restore the fleet information you will need to follow the addition process again</b>
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
            text: 'Delete fleet',
            variant: 'delete',
            size: 'large',
          }}
          customStylesFromWrap="w-1/2"
          customStyles="w-full"
          onClick={handleDeleteFleet}
        />
      </div>
    </div>
  );
};

DeleteFleetModal.propTypes = DeleteFleetModalPropTypes;

export default DeleteFleetModal;
