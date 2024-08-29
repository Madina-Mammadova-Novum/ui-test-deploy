'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteFleetModalPropTypes } from '@/lib/types';

import { Button, Loader, TextWithLabel, Title } from '@/elements';
import { deleteFleet, getFleetById } from '@/services/fleets';
import { deleteFleetFromState } from '@/store/entities/fleets/slice';
import { successToast } from '@/utils/hooks';

const DeleteFleetModal = ({ closeModal, id }) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fleetData, setFleetData] = useState({});
  const dispatch = useDispatch();
  const { name: fleetName } = fleetData;

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getFleetById({ fleetId: id });
      setInitialLoading(false);
      if (status === 200) setFleetData(data);
      if (error) console.error(error);
    })();

    return () => setFleetData({});
  }, []);

  const handleDeleteFleet = async () => {
    setLoading(true);
    const { status, message, error } = await deleteFleet({ fleetId: id });
    setLoading(false);

    if (status === 204) {
      dispatch(deleteFleetFromState(id));
      successToast(message);
      closeModal();
    }

    if (error) {
      console.error(error);
    }
  };

  if (initialLoading) {
    return (
      <div className="h-72 w-72">
        <Loader className="absolute top-1/2 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex max-w-[292px] flex-col gap-y-4">
      <Title level="2">Delete Fleet</Title>
      <TextWithLabel label="Fleet name" text={fleetName} customStyles="!flex-col !items-start [&>p]:!ml-0" />
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
            text: loading ? 'Please wait...' : 'Delete fleet',
            variant: 'delete',
            size: 'large',
          }}
          disabled={loading}
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
