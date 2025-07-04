'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AddNewTankerPropTypes } from '@/lib/types';

import { unassignedFleetOption } from '@/lib/constants';
import { getFleetsSelector } from '@/store/selectors';
import { AddTankerForm } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';

const AddNewTanker = ({ closeModal }) => {
  const [selectedFleet, setSelectedFleet] = useState(unassignedFleetOption);

  const { data } = useSelector(getFleetsSelector);

  const fleetOptions = [unassignedFleetOption, ...convertDataToOptions({ data }, 'id', 'name')];

  return (
    <AddTankerForm
      closeModal={closeModal}
      fleetOptions={fleetOptions}
      selectedFleet={selectedFleet}
      setSelectedFleet={setSelectedFleet}
    />
  );
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
