'use client';

import { useMemo, useState } from 'react';

import { AddNewTankerPropTypes } from '@/lib/types';

import { unassignedFleetOption } from '@/lib/constants';
import { AddTankerManuallyForm, AddTankerWithImoForm } from '@/units';

const AddNewTanker = ({ closeModal, id, fleetOptions }) => {
  const [step, setStep] = useState('imo');
  const [selectedFleet, setSelectedFleet] = useState(unassignedFleetOption);
  const [q88, setQ88] = useState({});

  const handleNextStep = () => setStep('tanker_form');

  const printModal = useMemo(() => {
    switch (step) {
      case 'tanker_form':
        return (
          <AddTankerManuallyForm
            closeModal={closeModal}
            goBack={() => setStep('imo')}
            id={id}
            fleetData={selectedFleet}
            q88={q88}
          />
        );
      default:
        return (
          <AddTankerWithImoForm
            closeModal={closeModal}
            handleNextStep={handleNextStep}
            fleetOptions={[unassignedFleetOption, ...fleetOptions]}
            setSelectedFleet={setSelectedFleet}
            selectedFleet={selectedFleet}
            setQ88={setQ88}
          />
        );
    }
  }, [step]);

  return <div>{printModal}</div>;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
