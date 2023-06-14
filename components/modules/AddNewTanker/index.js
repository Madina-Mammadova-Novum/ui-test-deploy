'use client';

import { useEffect, useMemo, useState } from 'react';

import { AddNewTankerPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { getFleetById } from '@/services/fleets';
import { AddTankerManuallyForm, AddTankerWithImoForm } from '@/units';

const AddNewTanker = ({ closeModal, id }) => {
  const [step, setStep] = useState('imo');
  const [fleetData, setFleetData] = useState({});
  const [imo, setImo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getFleetById({ fleetId: id });
      setLoading(false);
      if (status === 200) setFleetData(data);
      if (error) console.log(error);
    })();

    return () => setFleetData({});
  }, []);

  const handleNextStep = () => setStep('tanker_form');

  const printModal = useMemo(() => {
    switch (step) {
      case 'tanker_form':
        return (
          <AddTankerManuallyForm
            closeModal={closeModal}
            goBack={() => setStep('imo')}
            id={id}
            fleetData={fleetData}
            imo={imo}
          />
        );
      default:
        return (
          <AddTankerWithImoForm
            closeModal={closeModal}
            handleNextStep={handleNextStep}
            id={id}
            fleetData={fleetData}
            setImo={setImo}
          />
        );
    }
  }, [step, fleetData]);

  if (loading) {
    return (
      <div className="w-80 h-80">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );
  }

  return <div>{printModal}</div>;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
