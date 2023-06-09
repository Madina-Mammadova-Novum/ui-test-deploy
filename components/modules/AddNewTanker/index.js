'use client';

import { useMemo, useState } from 'react';

import { AddNewTankerPropTypes } from '@/lib/types';

import { AddTankerManuallyForm, AddTankerWithImoForm } from '@/units';

const AddNewTanker = ({ closeModal }) => {
  const [step, setStep] = useState('imo');

  const handleNextStep = () => setStep('tanker_form');

  const printModal = useMemo(() => {
    switch (step) {
      case 'tanker_form':
        return <AddTankerManuallyForm closeModal={closeModal} goBack={() => setStep('imo')} />;
      default:
        return <AddTankerWithImoForm closeModal={closeModal} handleNextStep={handleNextStep} />;
    }
  }, [step]);

  return <div>{printModal}</div>;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
