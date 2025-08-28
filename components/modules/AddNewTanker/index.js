'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { AddNewTankerPropTypes } from '@/lib/types';

import { unassignedFleetOption } from '@/lib/constants';
import { getFleetsSelector } from '@/store/selectors';
import { AddTankerForm, AddTankerManuallyForm } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';

const AddNewTanker = ({ closeModal }) => {
  const [step, setStep] = useState('initial');
  const [selectedFleet, setSelectedFleet] = useState(unassignedFleetOption);
  const [q88Data, setQ88Data] = useState({});

  const { data } = useSelector(getFleetsSelector);

  const fleetOptions = [unassignedFleetOption, ...convertDataToOptions({ data }, 'id', 'name')];

  const handleMoveToManualForm = (formData) => {
    setSelectedFleet(formData.fleet);

    setQ88Data({
      imo: formData.imo,
      file: formData.file,
      vesselId: formData.vesselId,
    });

    setStep('manual');
  };

  const printModal = useMemo(() => {
    switch (step) {
      case 'manual':
        return (
          <AddTankerManuallyForm
            closeModal={closeModal}
            goBack={() => setStep('initial')}
            fleetData={selectedFleet}
            q88={q88Data}
          />
        );
      default:
        return (
          <AddTankerForm
            closeModal={closeModal}
            fleetOptions={fleetOptions}
            selectedFleet={selectedFleet}
            setSelectedFleet={setSelectedFleet}
            onMoveToManualForm={handleMoveToManualForm}
          />
        );
    }
  }, [step, selectedFleet, q88Data, fleetOptions, closeModal]);

  return printModal;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
