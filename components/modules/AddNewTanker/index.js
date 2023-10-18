'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { AddNewTankerPropTypes } from '@/lib/types';

import { unassignedFleetOption } from '@/lib/constants';
import { getFleetsSelector } from '@/store/selectors';
import { AddTankerManuallyForm, AddTankerWithImoForm } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';

const AddNewTanker = ({ closeModal }) => {
  const [step, setStep] = useState('imo');
  const [selectedFleet, setSelectedFleet] = useState(unassignedFleetOption);
  const [q88, setQ88] = useState({});

  const { data } = useSelector(getFleetsSelector);

  const handleNextStep = () => setStep('tanker_form');

  const printModal = useMemo(() => {
    switch (step) {
      case 'tanker_form':
        return (
          <AddTankerManuallyForm
            closeModal={closeModal}
            goBack={() => setStep('imo')}
            fleetData={selectedFleet}
            q88={q88}
          />
        );
      default:
        return (
          <AddTankerWithImoForm
            closeModal={closeModal}
            handleNextStep={handleNextStep}
            fleetOptions={[unassignedFleetOption, ...convertDataToOptions({ data }, 'id', 'name')]}
            setSelectedFleet={setSelectedFleet}
            selectedFleet={selectedFleet}
            setQ88={setQ88}
          />
        );
    }
  }, [step]);

  return printModal;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
